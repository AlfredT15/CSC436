#!/usr/bin/env python3

import itertools

def formatInput(relation, inputFD):

    # getting every combination of the relation set to test as candidate keys
    potentialkeys = []
    for i in range(1, len(relation)+1):
        for comb in itertools.combinations(relation, i):
            potentialkeys.append(set(comb))

    # making the functional dependencies a list of sets
    individual = inputFD.split("; ")
    FD = []
    for item in individual:
        left, right = item.split("->")
        FD.append((set(left.split(',')), set(right.split(','))))

    return(potentialkeys, FD)


def findCD(relation, potentialkeys, FD):
    cd = []
    # get the closure of every potential key
    for closureLHS in potentialkeys:
        closureRHS = closureLHS.copy()

        # this loop is here for whenever the closure gets updated, go through the list of FD again
        changed = True
        while changed == True:
            changed = False
            for fd in FD:
                if fd[0].issubset(closureRHS) and (fd[1].issubset(closureRHS)) == False:
                    closureRHS = closureRHS.union(fd[1])
                    changed = True

            if closureRHS == relation:
                cd.append(closureLHS)

                # for removing any possible superkeys that has the candidate key as a subset
                removeList = []
                for subset in potentialkeys:
                    if closureLHS.issubset(subset):
                        removeList.append(subset)

                # if i tried to remove the subsets in the above loop, it will perform weirdly and miss some subsets
                for t in removeList:
                    potentialkeys.remove(t)

                break
    return cd

def main():
    # the input format it is expecting
    relation = {'A', 'B', 'C', 'D', 'E', 'G'}
    inputFD = 'A,B->C,D; A->B; B->C; C->E; B,D->A'

    potentialkeys, FD = formatInput(relation, inputFD)
    cd = findCD(relation, potentialkeys, FD)

    print(cd)

if __name__ == "__main__":
    main()
#!/usr/bin/env python3

import itertools

def formatInput(inputRelation, inputFD):

    # check empty inputs
    if inputRelation == '':
        print('Empty input for the relation, stopping.')
        exit()
    if inputFD == '':
        print('Empty input for the functional dependencies, stopping.')
        exit()

    # if something weird happens with split or whitespace input
    relation = set(inputRelation.split(', '))
    if len(relation) == 0:
        print('Was not able to read input for the relation, stopping.')
        exit()
    for item in relation:
        if item.isspace():
            print('Found whitespace in the relation input, stopping.')
            exit()
    

    # getting every combination of the relation set to test as candidate keys
    potentialkeys = []
    for i in range(1, len(relation)+1):
        for comb in itertools.combinations(relation, i):
            potentialkeys.append(set(comb))

    # making the functional dependencies a list of sets
    individual = inputFD.split("; ")
    FD = []
    for item in individual:
        try:
            left, right = item.split("->")
        except ValueError as ve:
            print('Could not find a -> in functional depencencies input, stopping.')
            exit()

        FD.append((set(left.split(',')), set(right.split(','))))
    if FD == [({''}, {''})]:
        print('Could not extract functional depencenies from input, got empty list, stopping.')
        exit()

    return(relation, potentialkeys, FD)


def findCD(relation, potentialkeys, FD):
    cd = []
    # go through evert potential key and get its closure
    while len(potentialkeys) > 0:
        closureLHS = potentialkeys.pop(0)
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
    inputRelation = 'A, B, C, D, E, G'
    inputFD = 'A,B->C,D; A->B; B->C; C->E; B,D->A'

    relation, potentialkeys, FD = formatInput(inputRelation, inputFD)
    cd = findCD(relation, potentialkeys, FD)

    print('Relation:', inputRelation)
    print('Functional depencencies:')
    print(inputFD.replace('; ', '\n'))
    print('Candidate keys\n' + str(cd) + '\n')


    inputRelation = 'A, B, C, D, E'
    inputFD = 'A->B,C; C,D->E; B->D; E->A'

    relation, potentialkeys, FD = formatInput(inputRelation, inputFD)
    cd = findCD(relation, potentialkeys, FD)

    print('Relation:', inputRelation)
    print('Functional depencencies:')
    print(inputFD.replace('; ', '\n'))
    print('Candidate keys\n' + str(cd))

if __name__ == "__main__":
    main()
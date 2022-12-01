# Programming Task 1

This program takes two values as input:
1. A relation R with a set of attributes. The number of attributes should be variable.
2. A set of functional dependencies F that hold on R. The number of functional dependencies should be variable.

Our program then computes a list of candidate keys and prints it to console.

## Running the program

There are two ways to run the program. Either input your relations and functional dependencies in the command line or input a file.

### Input from the command line

To input data from the command type `python3 find_candidate_key.key -r <RELATION> -d <FUNCTIONAL DEPENDENCIES>`

The following is an example of an input `python3 find_candidate_key.py -r "A, B, C, D, E, G" -d "A,B->C,D; A->B; B->C; C->E; B,D->A" `

#### Relation

Relations must be inputed as a string seperated by commas

#### Functional dependency

Functional dependencies must be of the format LHS -> RHS with the LHS and RHS being either a composite or a single value. Composites are separated by commas. The '->' signfies the relationship between one group and another. Each functional dependency must be closed with a ; if there are more dependencies following.


### Inputing a file

To input a file type `python3 find_candidate_key.py -f '/path/to/file'`. 

The following is the format expected in the input file:

    <RELATION 1>
    <FUNCTIONAL DEPENDENCY 1>
    ...
    <RELATION n>
    <FUNCTIONAL DEPENDENCY n>

Each relation must be followed by a corresponding functional dependency 

The following is an example of the input expected in the file:

    A, B, C, D, E, G
    A,B->C,D; A->B; B->C; C->E; B,D->A
    A, B, C, D, E
    A->B,C; C,D->E; B->D; E->A
    A, B, C, D, E
    A->B; B,C->E; E,D->A

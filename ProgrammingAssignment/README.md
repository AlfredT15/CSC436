# Programming Task 1

This program takes two values as input:
1- A relation R with a set of attributes. The number of attributes should be variable.
2- A set of functional dependencies F that hold on R. The number of functional dependencies should be variable.

Our program then computes a list of candidate keys and prints it to console.

## Running the program

There are two ways to run the program. Either input your relations and functional dependencies in the command line or input a file.

### Inputing a file

To input a file type "python3 find_candidate_key.py -f /path/to/file"

The following is an example file:
A, B, C, D, E, G
A,B->C,D; A->B; B->C; C->E; B,D->A
A, B, C, D, E
A->B,C; C,D->E; B->D; E->A
A, B, C, D, E
A->B; B,C->E; E,D->A

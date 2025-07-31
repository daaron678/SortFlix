#include <iostream>

/*
main() will handle any changes to the data set that the user requests

Workflow: i) prompt user to add any movies to the dataset that is not there
          ii) prompt user to add filters to dataset based on genre,...
          iii) prompt user to select the rating critic they want to use 

              - if the rating critic is a metascore (average of the others), then prompt user to assign weights 
                (in range of 1-10) to each rating critic. (The weighted average is calculated as :
                [Rotten Rating * Rotten weight + IMDB Rating * IMDB weight] / sum_of_weights ) 
          
          iV) update dataset with these changes (using python)
          V) feed the updated dataset as some datastructure (array/graph/...) into the sorting algorithms
          Vi) output the sorted movies dataset for the user to see (web deployment if time permitting)      
*/

int main(){

    // command line prompts
    std::cout<< "Welcome to SortFlix ! "<<std::endl;



    return 0;
}

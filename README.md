# SortFlix
GUI that sorts movies by ratings and user preference


Metacritic is a movie aggregation site, which sorts movies into an overall rating based on weighted averages assigned to several movie critics. Problems within metacritic exist such as that movie ratings are only sorted by overall aggregate ratings; users cannot sort movies by an individual critic rating used to calculate overall rating. Additionally, metacritic does not allow individual users to assign their own preference weightings to movie critics. 
Our project aims to fix this by creating SortFlix, an application that allows users to sort ratings from multiple critics they can choose from, and assign weights to those critics. (For example if a user wanted to only include Rotten Tomatoes and IMDB ratings, they can assign Rotten Tomatoes a weight of .6 and IMDB a weight of .4).

To support sorting movies based on different rating sources, we will implement and compare two sorting algorithms from scratch:
Merge Sort: A stable divide-and-conquer sorting algorithm with consistent time complexity of O(n log n), regardless of input order. It is ideal when stability is needed (i.e., preserving the order of movies with equal scores).
Quick Sort: A fast and efficient in-place sorting algorithm that typically performs better in practice due to lower constant factors and cache efficiency. However, it can degrade to O(n²) in the worst case, which we mitigate by using randomized pivot selection.
We will apply both sorting algorithms to the same dataset and compare their performance and correctness when sorting by different criteria.


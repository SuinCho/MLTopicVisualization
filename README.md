# MLTopicVisualization

## Steps to resolve CORS erros
Please run on the root directory of the project: 
``` 
npm install http-server -g
npx http-server
```
Once you finished the installation, plese connect to http://127.0.0.1:8080
In the index of files, please open FIrstPost.html

Below is the files and the corresponding description. 

d3.v2.min.js - d3 version 2 is manually included for importing all the versions in one html file (FirstPost.html).
d3.v3.js - d3 version 3 is manually included for importing all the versions in one html file (FirstPost.html).  
d3.functions.js - defined functions that is used for FirstPost_03_MoreInteraction.html
FirstPost.html - all the scatter plots and graphs except residual plot are demonstrated along with the explanation. 
FirstPost_03_MoreInteraction.html - the scatterplot that contains following interaction: 1. adding datapoints 2. exposing regression line based on added datapoints 3. view residuals  
FirstPost_03_ScatterPlot.html - the simple scatterplot of linear data with regression lines 
FirstPost_04_05_Prediction_Classification.html - to be added in "To predict or to classify" section. Should be modified
FirstPost_06_RegressionLine.html - the scatterplot that contain following interaction: 1. generate random dataset and its regression line
FirstPost_07_08_OverfitUnderfit.html - the scatterplots that show the underfit and overfit
FirstPost_09_KNearestNeighbor.html - the scatterplot of with data for classification with following interaction: 1. generate hull, depending on the value of K
KnearestNeighbor.js - defined functions that is used for FirstPost_09_KNearestNEighbor.html
leastsquares.js - defined functions that is used for regression line 
main.css - css file 

In case the plot does not reflect the modification of the code, please erase the cached images and retry!

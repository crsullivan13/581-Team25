/*
Name: HyperparamInfo.js
Description: A component that will display extra information about a hyperparameter
Programmers: Griffin Keeter
Creation Date: 10/21/22
Preconditions: 
Postconditions: None
Errors: None
Side Effects: None
Invariants: None
Faults: None
*/

//Import React
import { useState, useEffect } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DataInput from "./DataInput";
import ReactTooltip from 'react-tooltip';




//Input: None
//Output: an html component that includes text about a hyperparameter
function HyperparamInfo(model_type, param_name) {
  switch(model_type){
    case "LinearRegression":
      return LinearRegressionParamInfo(param_name);
    break;
    case "LogisticRegression":
      return LogisticRegressionParamInfo(param_name);
    break;
    case "DecisionTreeRegression":
      return DecisionTreeRegressionParamInfo(param_name);
    break;

  }
  
  return(
    "Dwayne."
  );
}

function LinearRegressionParamInfo(param_name){
}

function DecisionTreeRegressionParamInfo(param_name){
}

function LogisticRegressionParamInfo(param_name){
  switch(param_name){
    case "penalty":
      return ("Specifies the norm of the penalty. If 'none' is selected, then no penalty is added. If 'l2' is selected then an L2 penalty term is selected. If 'l1' is selected an L1 penalty term is selected. The default is L2");
    break;
    case "dual":
      return ("Specifies whether there is dual or primal formulation. It is only implemented for the L2 penalty with the Liblinear solver. Dual should be set to false when the number of samples is greater than the number of features.");
    break;
    case "tol":
      return ("The tolerance for stopping criteria.");
    break;
    case "C":
      return ("The Inverse of regularization strength. Must be a positive float. Smaller values specify stronger regularization.");
    break;
    case "fit_intercept":
      return ("Specifices if a constant, or bias should be added to the decision function.");
    break;
    case "intercept_scaling":
      return ("This can be used only when the Liblinear solver is used and when Fit Intercept is set to true.");
    break;
    case "class_weight":
      return ("The weights associated with classes in the form {class_label: weight}. Classes should have weight one by default. The 'balanced' option uses the values of y to adjust weights proportional to class frequencies in the input data.");
    break;
    case "random_state":
      return ("Only can be used when the solver is set to Sag, Saga, or Liblinear. The data is shuffled randomly.");
    break;
    case "solver":
      return ("This option specifies the algorithm to use in the optimization problem. The default is 'lbfgs'. For small datasets, 'liblinear' works well, while for large ones 'sag' or 'saga' are faster. For multiclass problems only 'newton-cg' 'sag', 'saga' and 'lbfgs' handle multinomial loss. Liblinear is limited to one-versus-rest schemes.");
    break;
    case "max_iter":
      return ("Maximum number of iterations taken for the solvers to converge");
    break;
    case "multi_class":
      return ("If the option chosen is ‘ovr’, then a binary problem is fit for each label. For ‘multinomial’ the loss minimised is the multinomial loss fit across the entire probability distribution, even when the data is binary. ‘multinomial’ is unavailable when solver=’liblinear’. ‘auto’ selects ‘ovr’ if the data is binary, or if solver=’liblinear’, and otherwise selects ‘multinomial’.");
    break;
    case "verbose":
      return ("For the liblinear and lbfgs solvers set verbose to any positive number for verbosity.");
    break;
    case "warm_start":
      return ("When set to True, reuse the solution of the previous call to fit as initialization, otherwise, just erase the previous solution. Useless for liblinear solver. ");
    break;
    case "n_jobs":
      return ("Number of CPU cores used when parallelizing over classes if multi_class=’ovr’”. This parameter is ignored when the solver is set to ‘liblinear’ regardless of whether ‘multi_class’ is specified or not. None means 1 unless in a joblib.parallel_backend context. -1 means using all processors.");
    break;
    case "l1_ratio":
      return ("The Elastic-Net mixing parameter, with 0 <= l1_ratio <= 1. Only used if penalty='elasticnet'. Setting l1_ratio=0 is equivalent to using penalty='l2', while setting l1_ratio=1 is equivalent to using penalty='l1'. For 0 < l1_ratio <1, the penalty is a combination of L1 and L2.");
    break;
  }
}

//Export HyperparamInfo for Dashboard
export default HyperparamInfo;




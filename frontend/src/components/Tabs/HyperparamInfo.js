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
import {Tooltip as ReactTooltip} from 'react-tooltip'




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
    case "DecisionTreeClassifier":
      return DecisionTreeClassifierParamInfo(param_name);
    break;
    case "MLPClassifier":
      return MLPClassifier(param_name);
    break;
    case "GaussianBayesClassifier":
      return GaussianBayesClassifier(param_name);
    break;

  }
  
  return;
}

function LinearRegressionParamInfo(param_name){
}


function GaussianBayesClassifier(param_name){
  switch(param_name){
    case "priors":
      return ("Prior probabilities of the classes. If specified, the priors are not adjusted according to the data.");
    break;
    case "var_smoothing":
      return ("Portion of the largest variance of all features that is added to variances for calculation stability.");
    break;
  }
}

function DecisionTreeRegressionParamInfo(param_name){
  switch(param_name){
    case "crit":
      return ("The function to measure the quality of a split. Supported criteria are “squared_error” for the mean squared error, which is equal to variance reduction as feature selection criterion and minimizes the L2 loss using the mean of each terminal node, “friedman_mse”, which uses mean squared error with Friedman’s improvement score for potential splits, “absolute_error” for the mean absolute error, which minimizes the L1 loss using the median of each terminal node, and “poisson” which uses reduction in Poisson deviance to find splits.");
    break;
    case "splitter":
      return ("The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.");
    break;
    case "max_depth":
      return ("The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.");
    break;
    case "min_samples_split":
      return ("The minimum number of samples required to split an internal node: If option is an integer, then min_samples_split is considered to be the minimum number. If the option is a float, then min_samples_split is considered to be a fraction and ceil(min_samples_split * n_samples) are the minimum number of smaples for each split.");
    break;
    case "min_samples_leaf":
      return ("The minimum number of samples required to be at a leaf node. A split point at any depth will only be considered if it leaves at least min_samples_leaf training samples in each of the left and right branches. This may have the effect of smoothing the model, especially in regression. If it is an integer, then min_samples_leaf is used as the minimum number. If it is a float, then min_samples_leaf is a fraction and ceil(min_samples_leaf * n_samples) are the minimum number of samples for each node.");
    break;
    case "min_weight_frac_leaf":
      return ("The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node. Samples have equal weight when sample_weight is not provided.");
    break;
    case "max_features":
      return ("The number of features to consider when looking for the best split: If max features is an int, then that number is used as the number of features at each split. If it is a float, then max features is a fraction and max(1, int(max_features * n_features_in_)) features are considered at each split. If the option is set to 'auto', then max features is the same as N features. If 'sqrt', then Max features equals the square root of N features. If it is 'log2', then Max features equals the log base 2 of N features. If None, then Max features is the same as N features.");
    break;
    case "random_state":
      return ("Controls the randomness of the estimator. The features are always randomly permuted at each split, even if splitter is set to 'best'. When max_features < n_features, the algorithm will select max_features at random at each split before finding the best split among them. But the best found split may vary across different runs, even if max_features=n_features. That is the case, if the improvement of the criterion is identical for several splits and one split has to be selected at random. To obtain a deterministic behaviour during fitting, random_state has to be fixed to an integer.");
    break;
    case "max_leaf_nodes":
      return ("Grow a tree with max_leaf_nodes in best-first fashion. Best nodes are defined as relative reduction in impurity. If None then unlimited number of leaf nodes.");
    break;
    case "min_impurity_decrease":
      return ("A node will be split if this split induces a decrease of the impurity greater than or equal to this value.");
    break;
    case "ccp_alpha":
      return ("Complexity parameter used for Minimal Cost-Complexity Pruning. The subtree with the largest cost complexity that is smaller than ccp_alpha will be chosen. By default, no pruning is performed.");
    break;
  }
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
function DecisionTreeClassifierParamInfo(param_name){
  switch(param_name){
    case "crit":
      return ("The function to measure the quality of a split. Supported criteria are “squared_error” for the mean squared error, which is equal to variance reduction as feature selection criterion and minimizes the L2 loss using the mean of each terminal node, “friedman_mse”, which uses mean squared error with Friedman’s improvement score for potential splits, “absolute_error” for the mean absolute error, which minimizes the L1 loss using the median of each terminal node, and “poisson” which uses reduction in Poisson deviance to find splits.");
    break;
    case "splitter":
      return ("The strategy used to choose the split at each node. Supported strategies are “best” to choose the best split and “random” to choose the best random split.");
    break;
    case "max_depth":
      return ("The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples.");
    break;
    case "min_samples_split":
      return ("The minimum number of samples required to split an internal node: If option is an integer, then min_samples_split is considered to be the minimum number. If the option is a float, then min_samples_split is considered to be a fraction and ceil(min_samples_split * n_samples) are the minimum number of smaples for each split.");
    break;
    case "min_samples_leaf":
      return ("The minimum number of samples required to be at a leaf node. A split point at any depth will only be considered if it leaves at least min_samples_leaf training samples in each of the left and right branches. This may have the effect of smoothing the model, especially in regression. If it is an integer, then min_samples_leaf is used as the minimum number. If it is a float, then min_samples_leaf is a fraction and ceil(min_samples_leaf * n_samples) are the minimum number of samples for each node.");
    break;
    case "min_weight_frac_leaf":
      return ("The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node. Samples have equal weight when sample_weight is not provided.");
    break;
    case "max_features":
      return ("The number of features to consider when looking for the best split: If max features is an int, then that number is used as the number of features at each split. If it is a float, then max features is a fraction and max(1, int(max_features * n_features_in_)) features are considered at each split. If the option is set to 'auto', then max features is the same as N features. If 'sqrt', then Max features equals the square root of N features. If it is 'log2', then Max features equals the log base 2 of N features. If None, then Max features is the same as N features.");
    break;
    case "random_state":
      return ("Controls the randomness of the estimator. The features are always randomly permuted at each split, even if splitter is set to 'best'. When max_features < n_features, the algorithm will select max_features at random at each split before finding the best split among them. But the best found split may vary across different runs, even if max_features=n_features. That is the case, if the improvement of the criterion is identical for several splits and one split has to be selected at random. To obtain a deterministic behaviour during fitting, random_state has to be fixed to an integer.");
    break;
    case "max_leaf_nodes":
      return ("Grow a tree with max_leaf_nodes in best-first fashion. Best nodes are defined as relative reduction in impurity. If None then unlimited number of leaf nodes.");
    break;
    case "min_impurity_decrease":
      return ("A node will be split if this split induces a decrease of the impurity greater than or equal to this value.");
    break;
    case "ccp_alpha":
      return ("Complexity parameter used for Minimal Cost-Complexity Pruning. The subtree with the largest cost complexity that is smaller than ccp_alpha will be chosen. By default, no pruning is performed.");
    break;
    case "class_weight":
      return ("Weights associated with classes. If None, all classes are supposed to have weight one. The “balanced” mode uses the values of y to automatically adjust weights inversely proportional to class frequencies in the input data as n_samples / (n_classes * np.bincount(y))");
    break;
  }
}
function MLPClassifier(param_name){
  switch(param_name){
    case "hidden_layer_sizes":
      return ("The ith element represents the number of neurons in the ith hidden layer. This parameter allows you to add layers.");
    break;
    case "activation":
      return ("The activation function for the hidden layers. The selection 'identity’, means there is no-op activation. \
      This useful to implement linear bottleneck, returns f(x) = x. ‘logistic’, the logistic sigmoid function, returns f(x) = 1 / (1 + exp(-x)). \
      The selection ‘tanh’ represents the hyperbolic tan function, returns f(x) = tanh(x).\
      ‘relu’, the rectified linear unit function, returns f(x) = max(0, x)");
    break;
    case "activation":
      return ("The activation function for the hidden layers. The selection 'identity’, means there is no-op activation. \
      This useful to implement linear bottleneck, returns f(x) = x. ‘logistic’, the logistic sigmoid function, returns f(x) = 1 / (1 + exp(-x)). \
      The selection ‘tanh’ represents the hyperbolic tan function, returns f(x) = tanh(x).\
      ‘relu’, the rectified linear unit function, returns f(x) = max(0, x)");
    break;
    case "solver":
      return ("The solver for weight optimization.\
      ‘lbfgs’ is an optimizer in the family of quasi-Newton methods.\
      ‘sgd’ refers to stochastic gradient descent.\
      ‘adam’ refers to a different kind of stochastic gradient-based optimizer");
    break;
    case "alpha":
      return ("Strength of the L2 regularization term. The L2 regularization term is divided by the sample size when added to the loss.");
    break;
    case "batch_size":
      return ("Size of minibatches for stochastic optimizers. If the solver is ‘lbfgs’, the classifier will not use minibatch. When set to “auto”,\
       the batch size is minimum(200, n_samples).");
    break;
    case "learning_rate":
      return ("    Learning rate schedule for weight updates.\
      ‘constant’ is a constant learning rate given by ‘learning_rate_init’.\
      ‘invscaling’ gradually decreases the learning rate at each time step ‘t’ using an inverse scaling exponent of ‘power_t’. effective_learning_rate = learning_rate_init / pow(t, power_t)\
      ‘adaptive’ keeps the learning rate constant to ‘learning_rate_init’ as long as training loss keeps decreasing. Each time two consecutive epochs fail to decrease training loss by at least tol, or fail to increase validation score by at least tol if ‘early_stopping’ is on, the current learning rate is divided by 5.\
      Only used when solver='sgd'.");
    break;
    case "learning_rate_init":
      return ("The initial learning rate used. It controls the step-size in updating the weights. Only used when solver=’sgd’ or ‘adam’.");
    break;
    case "power_t":
      return ("The exponent for inverse scaling learning rate. It is used in updating effective learning rate when the learning_rate is set to ‘invscaling’. Only used when solver=’sgd’.");
    break;
    case "max_iter":
      return ("Maximum number of iterations. The solver iterates until convergence (determined by ‘tol’) or this number of iterations. For stochastic solvers (‘sgd’, ‘adam’), note that this determines the number of epochs (how many times each data point will be used), not the number of gradient steps.");
    break;
    case "shuffle":
      return ("Whether to shuffle samples in each iteration. Only used when solver=’sgd’ or ‘adam’.");
    break;
    case "random_state":
      return ("Determines random number generation for weights and bias initialization, train-test split if early stopping is used, and batch sampling when solver=’sgd’ or ‘adam’. Pass an int for reproducible results across multiple function calls.");
    break;
    case "tol":
      return ("Tolerance for the optimization. When the loss or score is not improving by at least tol for n_iter_no_change consecutive iterations, unless learning_rate is set to ‘adaptive’, convergence is considered to be reached and training stops.");
    break;
    case "verbose":
      return ("Whether to print progress messages");
    break;
    case "warm_start":
      return ("When set to True, reuse the solution of the previous call to fit as initialization, otherwise, just erase the previous solution");
    break;
    case "momentum":
      return ("Momentum for gradient descent update. Should be between 0 and 1. Only used when solver=’sgd’.");
    break;
    case "nesterovs_momentum":
      return ("Whether to use Nesterov’s momentum. Only used when solver=’sgd’ and momentum > 0.");
    break;
    case "early_stopping":
      return ("Whether to use early stopping to terminate training when validation score is not improving. If set to true, it will automatically set aside 10% of training data as validation and terminate training when validation score is not improving by at least tol for n_iter_no_change consecutive epochs. The split is stratified, except in a multilabel setting. If early stopping is False, then the training stops when the training loss does not improve by more than tol for n_iter_no_change consecutive passes over the training set. Only effective when solver=’sgd’ or ‘adam’.");
    break;
    case "validation_fraction":
      return ("The proportion of training data to set aside as validation set for early stopping. Must be between 0 and 1. Only used if early_stopping is True.");
    break;
    case "beta_1":
      return ("Exponential decay rate for estimates of first moment vector in adam, should be in [0, 1). Only used when solver=’adam’.");
    break;
    case "beta_2":
      return ("Exponential decay rate for estimates of second moment vector in adam, should be in [0, 1). Only used when solver=’adam’.");
    break;
    case "epsilon":
      return ("Value for numerical stability in adam. Only used when solver=’adam’.");
    break;
    case "n_iter_no_change":
      return ("Maximum number of epochs to not meet tol improvement. Only effective when solver=’sgd’ or ‘adam’.");
    break;
    case "max_fun":
      return ("Only used when solver=’lbfgs’. Maximum number of loss function calls. The solver iterates until convergence (determined by ‘tol’), number of iterations reaches max_iter, or this number of loss function calls. Note that number of loss function calls will be greater than or equal to the number of iterations for the MLPClassifier.");
    break;
  }
}
//Export HyperparamInfo for Dashboard
export default HyperparamInfo;




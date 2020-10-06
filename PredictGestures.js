var predictedClassLabels = nj.zeros([150]);

const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 0;
var trainingCompleted = false;


function draw(){
  clear();
  if(trainingCompleted === false){
    Train();
    trainingCompleted = true;
  }
  Test();
}

function Train(){
  for(var i=0; i<train0.shape[3]; i++){
    var features = train0.pick(null,null,null,i).reshape(1,120).tolist();
    knnClassifier.addExample(features, 0);
    var features1 = train1.pick(null,null,null,i).reshape(1,120).tolist();
    knnClassifier.addExample(features1, 1);
  }

}

function Test(){
  var currentTestingSample = test.pick(null,null,null,testingSampleIndex).reshape(1,120);
  var predictedLabel = knnClassifier.classify(currentTestingSample.tolist(), GotResults);
  console.log(currentTestingSample + "-----" + predictedClassLabels.get(testingSampleIndex));

}

function GotResults(err, result){
  testingSampleIndex++;
  if(testingSampleIndex>train0.shape[3]-1){
    testingSampleIndex = 0;
  }
  predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
}

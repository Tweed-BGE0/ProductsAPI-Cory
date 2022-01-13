

const parseLine = (string) => {

     var result = [];
     var reset = false;
     for (var i = 0; i < string.length; i++) {
       if (reset) {
         i = 0;
         reset = false;
       }
       if (string === 'null') {
         result.push('null')
         break;
       }

       if (string[i] === '"') { // if current letter is quote
        for (var j = i+1; j < string.length; j++) {
          if (string[j] === '"') {
             result.push(string.slice(i+1, j));
             string = string.slice(j+2);
             reset = true
            }
          }

        } else {
          if (string[i] === ',') {
            result.push(string.slice(0, i))
            string = string.slice(i+1)
           reset = true
         }
       }

     }
     return result;
}


/*
var x = '1993957,898628,"Fabric","FullControlSkin"'
var y = '1993958,898629,"Green Leaf Certified",null'

console.log(parseLine(x))
console.log(parseLine(y))

1612624,726860,"5 Year Warranty",null
var x= '1612623,726859,"Satisfaction Guaranteed",null'
var y = '1612622,726859,"Fabric","80% Cotton, 20% Polyester"'
1612625,726860,"Cut","Straight"
1612626,726861,"Fabric","FullControlSkin"

1993956,898628,"Non-GMO",null
1993959,898629,"Green Leaf Certified",null
1993960,898630,"Lifetime Guarantee",null
1993961,898630,"Fair Trade Certified",null
*/


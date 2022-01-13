

const parseLine = (string) => {

     var result = [];
     var reset = false;
     for (var i = 0; i < string.length; i++) {
      console.log(string)
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
             console.log('newstring', string)
             i=-1
             reset = true
             break;
            }
          }

        } else if (string[i] === ',') {
            result.push(string.slice(0, i))
            string = string.slice(i+1)
            i=-1
            reset = true
          } else if (i === string.length -1 && string.length > 0) {
            result.push(string.slice(0))
          }

      }
      return result;
    }

    module.exports = parseLine

    /*
    var x = '64713,"Orie Shorts","Provident labore officia ullam odit odio occaecati voluptas.","Veritatis a aut. Eius et fugit rem. Eos quia consectetur asperiores aliquam.","Shorts",8'

    console.log(parseLine(x))

        var x ='64750,"Kenneth 350 Sunglasses","Qui cumque magni in.","Tempora qui hic iusto nobis nihil reprehenderit voluptatem. Aut cum sit ea corrupti quae qui in eum alias. Et optio sit quod et non ea. Placeat eaque est voluptatem est iste sint. Maiores nesciunt voluptatem delectus porro.","Sunglasses",93'
        console.log(parseLine(x), parseLine(x).length)
    var x = '1993957,898628,"Fabric","FullControlSkin"'
    var y = '1993958,898629,"Green Leaf Certified",null'

    console.log(parseLine(y))

    64749,"Cristobal Skirt","Aut dolorem voluptatum tenetur consequatur porro aut.","Consequuntur eius consequatur odio sit provident. Rerum minima dolore quo similique impedit officia voluptas. Sunt sed quod enim iste rerum repellendus. Nobis ut nobis sit non id corporis corrupti modi doloribus. Vel reprehenderit quam autem. Quibusdam exercitationem ducimus ad iste veritatis dolor aut natus maiores.","Skirt",6


    '64751,"Anita Dress","Accusamus repellendus eum sit quisquam reiciendis.","Ratione alias quam ad at. Numquam distinctio facilis cumque. Delectus velit alias non et et.","Dress",382'



    var x = '34,6,"https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80","https://images.unsplash.com/photo-1535639818669-c059d2f038e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"'




1612624,726860,"5 Year Warranty",null
var x= '1612623,726859,"Satisfaction Guaranteed",null'
var y = '1612622,726859,"Fabric","80% Cotton, 20% Polyester"'
1612625,726860,"Cut","Straight"
1612626,726861,"Fabric","FullControlSkin"

1993956,898628,"Non-GMO",null
1993959,898629,"Green Leaf Certified",null
1993960,898630,"Lifetime Guarantee",null
1993961,898630,"Fair Trade Certified",null



35,6,"https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80","https://images.unsplash.com/photo-1498098662025-04e60a212db4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
36
*/


const parseLine = (string) => {

     var result = [];
     var reset = false;
     for (var i = 0; i < string.length; i++) {
       if (reset) {
         i = 0;
         reset = false;
       }
       if (string === 'null') {
         result.push(null)
         break;
       }

       if (string[i] === '"') { // if current letter is quote
        for (var j = i+1; j < string.length; j++) {
          if (string[j] === '"') {
             result.push(string.slice(i+1, j));
             string = string.slice(j+2);
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
    var y = '22,4,"Pinstripe",null,65,0'
    console.log(parseLine(y))
    var x= '2,"Bright Future Sunglasses","You\'ve got to wear shades","Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.","Accessories", 69'

    console.log(parseLine(x))
    var x = '64713,"Orie Shorts","Provident labore officia ullam odit odio occaecati voluptas.","Veritatis a aut. Eius et fugit rem. Eos quia consectetur asperiores aliquam.","Shorts",8'
*/

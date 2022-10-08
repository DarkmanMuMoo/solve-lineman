function solve(){

    var code = "CYtZBsWZaZliYZocWLZlXuZZYWYeYXZsXeZXtXWpXeRYYYd!ZnYeWXoYXasnX,WXWrWPoAdWesnciGenWr"
    var maxChar = findMaxCountChar(code)
    var railCount = maxChar.length
    var filterMaxChar = code.replace(new RegExp(`[${maxChar.join("")}]`,'g'),'')
    console.log(filterMaxChar)
    var metric = createMetric(filterMaxChar.length,railCount)

    var filterMaxCharArray = filterMaxChar.split('')
    var x =0
    var y =0
    var diagnosDirection = 'down'

    const path = []

    for(var i = 0 ; i<=filterMaxCharArray.length-1; i++){
         metric[y][x] = 'X' // mark  place where we want  to place char.
         path.push([x,y]) // cache path we will use this later.
        x++
        if(y == railCount-1){
            console.log(`up`)
           diagnosDirection = 'up'
        }else if(y == 0){
            diagnosDirection= 'down'
        }

        if(diagnosDirection == 'down'){
            y++
        }else{
            y--
        }

    }
    for(var i = 0 ; i<=metric.length-1; i++){
        for(var j = 0 ; j<=metric[i].length-1; j++){
          var char =   metric[i][j]
          if(char == 'X' && filterMaxCharArray.length != 0){
            metric[i][j] = filterMaxCharArray.shift()
          }
        }
    }

    // reuse  path we cache 
    return  path.map(cordinate=>{
        [x, y] = cordinate
        return  metric[y][x]
    }).join('');


}

function createMetric(x,y){
    var metric = []
    for(var i = 0 ; i<=y-1; i++){
       metric.push(Array.apply(null, Array(x)).map(function (_, i) {return "-"})) 
    } 

    return metric;
    
}
function findMaxCountChar(code){

    var maxCount = 0
    var analysys =  code.split('').reduce((map,curr)=>{

       if(!!map[curr]){
        map[curr] += 1 
       }else{
       map[curr] = 1
       }


       if(maxCount== 0 || maxCount <  map[curr] ){

        maxCount = map[curr]
     }
       return map
    },{})



  return   Object.entries(analysys)
                .filter(entry=>entry[1]==maxCount)
                .map(entry=>entry[0])
   

}



solve()



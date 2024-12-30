const db=require('mysql2');
const connection=db.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'Somesh@2504',
        database:'fooditems',

    }
)

function getData(){
   return new Promise((success,reject)=>{
    connection.query('select * from fooditems',(err,rows,cols)=>{
        if(err){
           reject(err);
        }
        else{
           success(rows);
        }
    });
   
   });
}
function postData(name, img, price, description) {
   return new Promise((success,reject)=>{
    const query = 'INSERT INTO fooditems (item_name, img, price, description) VALUES (?, ?, ?, ?)';
    const values = [name, img, price, description];
    connection.query(query, values, (err, rows) => {
        if (err) {
           reject(err);
        } else {
           success(rows);
        }
    });
    
   })
}

module.exports={getData,postData};

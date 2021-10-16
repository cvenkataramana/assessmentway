var exp = require('express');
var app = exp();
var path = require('path');
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));


var mongoclient=require('mongodb').MongoClient;
var dbo;

var url="mongodb+srv://saikumar:saikumarpassword@cluster0.r6tyj.mongodb.net/Surveydatabase?retryWrites=true&w=majority";
mongoclient.connect(url,{ useUnifiedTopology: true },(err,client)=>
{
    if(err){
        console.log("db not connected",err);
        
    }else{
        dbo=client.db('Surveydatabase');
        console.log("DB connected");
    }
})

app.use(exp.static (path.join(__dirname,'dist/assessmentway')));


app.post('/storeData',(req,res)=>{
    
    
    dbo.collection('sampledata').insertMany(req.body,(err,dataArray)=>
    {
        if(err)
        {            
            res.json({message:"Data Not Inserted !!"});
        }
        else
        {
            res.json({message:"Data Inserted"});
        }
    });
    
    
    });


    app.get('/getData',(req,res)=>{
    
            
            dbo.collection('sampledata').find({}).toArray((err,retrievedData)=>{
                if(err){
                    console.log(err);
                }else{
                    res.json({message:"RetrievedData Found",retrievedData});
                }
            })
        });


app.listen(process.env.PORT ||8099,()=>
{
    console.log(`server is running on port 8099`)
});
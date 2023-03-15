const express = require('express');
const path = require('path');
const port = 8000;



const db = require('./config/mongoose');
const Plan =  require('./models/plan');

const app= express();




app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views')); 
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(bodyParser.urlencoded({ extended: true }));


var todoList = [
  {
    plan: "Ranchi",
    date: "12-03-2023",
    category: "Vaccation"
  },
  {
    plan: "Buy Vegetables",
    date: "14-03-2023",
    category: "House Work "
  }
]

app.get('/',async function(req,res){
  try{
    const todo =await Plan.find({});
    return res.render('home',{
      title: 'My Plans',
      todo_list: todo
    });
  }
  catch(error){
    console.log("Error in Planning from db", error); 
    return;
  }
});

app.post('/add', async function(req,res){
  try{
    await Plan.create({
      plan: req.body.plan,
      date: req.body.date,
      category: req.body.category
    });
    console.log('Plan added ');
    return res.redirect('back');
  }
  catch(error){
    console.log('Error in adding a plan ',error);
    return res.status(500).send('Error in adding a plan');
  }
});

  // app.get('/delete-plan',async function(req,res){
  //   try{
  //     let id= req.query.id;

  //     await Plan.findByIdAndDelete(id);
  //     return res.redirect('back');
  //   }
  //   catch(err){
  //     console.log('Error in deleting ',err);
  //     return res.status(500).send('Internal server Error ');
  //   }
  // });
  app.post('/delete-plans', async function(req, res) {
    try {
      let ids = req.body.ids;
  
      // use Promise.all() to execute multiple delete operations simultaneously
      await Promise.all(ids.map(id => Plan.findByIdAndDelete(id)));
  
      res.redirect('/');
    } catch(err) {
      console.log('Error in deleting', err);
      res.status(500).send('Internal server error');
    }
  });
  

app.listen(port, function(err){
  if(err){
      console.log('Error in running the server',err);
  }
  console.log('My express server is running on port:',port);
  
});



const express = require ('express')
const router = express.Router();
const Person = require('../models/Person');


router.post('/',async (req, res) => {
    try {

        const data = req.body

        const newPerson = new Person(data);

       const savedPerson = await newPerson.save();
       console.log('Saved Data')
       res.status(200).json(savedPerson)


    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
       
    }


});

router.get('/',async(req,res)=>{
        try {
            const data = await Person.find();
            console.log('Data successfully geted')
       res.status(200).json(data)

        } catch (error) {
            
             res.status(500).json({error:'Internal Server Error'})
       
     }

});

router.get('/:workType', async (req,res)=> {
    try {
            const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){  
        const response = await Person.find({work:workType});
        console.log('Work type successfully added')
        res.status(200).json(response);


    }else{
        res.status(400).json({error:'Invalid work type'});
    }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
       
    }

})

router.put('/:id', async (req,res)=>{
    try {
        const personId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new : true,
            runValidators:true,
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data updated')
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'});

        
    }
})

router.delete('/:id',async (req,res)=>{
    try {
       const personId = req.params.id;
       
       const response = await Person.findByIdAndDelete(personId);
       if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted successfully')
        res.status(200).json(response);
        
    } catch (error) {

        console.log(error)
        res.status(500).json({error:'Internal Server Error'})
        
    }
})


module.exports = router;
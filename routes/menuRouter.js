const express = require ('express')
const router = express.Router();
const MenuItem = require ('../models/Menuitem')

router.post('/',async (req, res) => {
    try {

        const ItemData = req.body

        const newItem = new MenuItem (ItemData);

       const savedItem = await newItem.save();
       console.log('Saved Menu')
       res.status(200).json(savedItem)


    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }
     });

     router.get('/',async(req,res)=>{
        try {
            const data = await MenuItem.find();
            console.log('Data successfully geted')
       res.status(200).json(data)

        } catch (error) {
            
             res.status(500).json({error:'Internal Server Error'})
       
     }

});

router.get('/:tasteType', async (req,res)=> {
    try {
     const tasteType = req.params.tasteType;
    if(tasteType == 'spicy'|| tasteType == 'sweet' || tasteType == 'sour'){  
        const response = await MenuItem.find({taste:tasteType});
        console.log('Feched TasteType')
        res.status(200).json(response);


    }else{
        res.status(400).json({error:'Invalid taste type'});
    }
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
       

    }

})

router.put('/:id', async(req,res)=>{
    try {

        const menuId = req.params.id;
    const updateDataById = req.body;

    const response = await MenuItem.findByIdAndUpdate(menuId,updateDataById,{
        new:true,
        runValidators:true
    })

    if(!response){
        return res.status(404).json({error:'Menu data not found'})
    }
    console.log('Menu data updated')
    res.status(200).json(response);


        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId)
     if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data deleted successfully')
        res.status(200).json(response);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal Server Error'});
        
    }
        

})



module.exports = router;
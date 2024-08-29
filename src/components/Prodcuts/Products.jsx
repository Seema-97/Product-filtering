import React, { Fragment, useState } from 'react'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const api = 'https://fakestoreapi.com/products'

const Products = () => {

    const [products , setProducts] = useState(null) ;
    // const[isproductRendered, setIsProductRendered] = useState(false);
    const [filterOptions, setFilterOptions] = useState('');

    const handleFilterOptions= (event) => {
        let optionValue = event.target.value 
        setFilterOptions(optionValue);


        switch (event.target.value) {
            case '0-price' :
                {
                    let sortedProduct = products.sort( (a, b) => Number(a.price) - Number(b.price) );   
                  setProducts(sortedProduct)
                  break;
        
                }
            case '1-price' :
                {
                    let sortedProduct = products.sort( (a, b) => Number(b.price) - Number(a.price) );   
                    setProducts(sortedProduct)
                    break;
                } 
             case '0-rating' :
                {
                    let sortedProduct = products.sort((a,b) => a.rating.rate - b.rating.rate);
                    setProducts(sortedProduct)
                    break;
                }    
             case '1-rating':
                {
                    let sortedProduct = products.sort((a,b) => b.rating.rate - a.rating.rate);
                    setProducts(sortedProduct)
                    break;
                }

        }

        // if(optionValue === '0-price'){
        //     let sortedProduct = products.sort(
        //         (a, b) => Number(a.price) - Number(b.price) );   
        //   setProducts(sortedProduct)
        // }
        // else if(optionValue === '1-price'){
        //     let sortedProduct = products.sort(
        //     (a, b) => Number(b.price) - Number(a.price))
        //   setProducts(sortedProduct)
        // }
        // else if(optionValue === '0-rating'){
        //     let sortedProduct = products.sort((a,b) => a.rating.rate - b.rating.rate);
        //     setProducts(sortedProduct)
        // }
        // else if(optionValue === '1-rating'){
        //     let sortedProduct = products.sort((a,b) => b.rating.rate - a.rating.rate);
        //     setProducts(sortedProduct)
        // }

    };

    const clearProducts = () => {
        setProducts(null);
        // setIsProductRendered(false);
    }

    const fetchProducts = () =>{
        fetch(api)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            // setIsProductRendered(true);
        })
   
   }

   console.log(products)


  return (
    <>
      <Box sx={{display:"flex" , alignItems:'center' , justifyContent:'center'}}>
      

      {products?.length > 0 ? 
        <Box sx={{display:"flex" , alignItems:'center' , justifyContent:'center' , gap:'40px'}}>
      <Button variant="contained" color='secondary' onClick={clearProducts} style={{margin:"auto"}}>Clear</Button> 
       <FormControl sx={{width:"200px"}}>
       <InputLabel id="demo-simple-select-label">Filter Products</InputLabel>
       <Select
       labelId="demo-simple-select-label"
       id="demo-simple-select"
       label="filter Products"
       value = {filterOptions}
       onChange={handleFilterOptions}
       >
          <MenuItem value="0-price">sort by Price - low to high</MenuItem>
          <MenuItem value="1-price">sort by Price - high to low</MenuItem>
          <MenuItem value="0-rating">sort by Rating - low to high</MenuItem>
          <MenuItem value="1-rating">sort by Rating - high to low</MenuItem>
      </Select>
      </ FormControl>
       </Box>
      :
       <Button variant="contained" color='secondary' onClick={fetchProducts} style={{margin:"auto"}}>Get Products</Button>
      }
      </Box>
      
      <Box sx={{display:'flex' , flexWrap: 'wrap', gap:'15px', margin:'auto' , justifyContent:'center' , marginTop:'15px'}}>
      {products?.map(item => 
        <Fragment key={item.id}>
     <Card sx={{width:'450px' , minHeight : '400px' , textAlign:'center'}}>
      <p className="title">${item.title}</p>
      <p className="price">${item.price}</p>
      <p className="description">${item.description}</p>
      <p className="category">${item.category}</p>
      <img src= {item.image} alt="" className="image" style={{width : 200 , height : 200 , objectFit: "contain"}} />
      <div className="rating">
      <p>Rating : {item.rating.rate}</p> 
      <p>Count:{item.rating.count}</p>
      </div>
      </Card>
        </Fragment>
      )
     } 
    </Box>


      
    </>
  )
}

export default Products
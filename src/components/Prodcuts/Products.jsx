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
    const[isproductRendered, setIsProductRendered] = useState(false);
    const [filterOptions, setFilterOptions] = useState('');

    const handleFilterOptions= (event) => {
        setFilterOptions(event.target.value);

        if(event.target.value === '0-price'){
            let sortedProduct = products.sort(
                (a, b) => Number(a.price) - Number(b.price) );   
          setProducts(sortedProduct)
        }
        else if(event.target.value === '1-price'){
            let sortedProduct = products.sort(
            (a, b) => Number(b.price) - Number(a.price))
          setProducts(sortedProduct)
        }
    };

    const clearProducts = () => {
        setProducts(null);
        setIsProductRendered(false);
    }

    const fetchProducts = () =>{
        fetch(api)
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setIsProductRendered(true);
        })
   
   }

   console.log(products)


  return (
    <>
      <Box sx={{display:"flex" , alignItems:'center' , justifyContent:'center'}}>
      

      {isproductRendered ? 
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
     <Card sx={{width:'520px' , minHeight : '500px' , textAlign:'center'}}>
      <p className="title">${item.title}</p>
      <p className="price">${item.price}</p>
      <p className="description">${item.description}</p>
      <p className="category">${item.category}</p>
      <img src= {item.image} alt="" className="image" style={{width : 200 , height : 200 , objectFit: "contain"}} />
      <div className="rating">
      <span>${item.rating.rate}</span> 
      <span>${item.rating.count}</span>
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
// import { useEffect, useState} from "react";
// import "./home.css";
// function Home()
// {
//   let[category,setCategory]=useState([]);
//   let[choosedCategory,setChoosedCategory]=useState("");
//   let[entireProducts,setEntireProducts]=useState([]);
//   useEffect(()=>{
//     async function fun()
//     {
//         try
//         {
//           let responsemetadata=await fetch("http://localhost:8000/api/v1/category"); 
//           let actualdata=await responsemetadata.json();
//           // console.log(actualdata);
//           let totalProducts=await fetch("http://localhost:8000/api/v1/filter"); 
//           let totalProductsData=await totalProducts.json();
//           // console.log(totalProductsData);
//           if(actualdata)
//           {
//             setCategory(actualdata.CATEGORY);
//           }
//           // console.log(category);
//           if(totalProductsData)
//           {
//             setEntireProducts(totalProductsData.PRODUCTS);
//           }
//           // console.log(entireProducts);
//         }
//         catch(error)
//         {
//           console.log("-----------");
//           console.log(error);
//         }
//     }
//     fun();
//   },[]);
//   const showCategory=(event)=>
//   {
//     event.preventDefault();
//     const initialChoosedCategory=document.getElementById("category");
//     // console.log(initialchoosedCategory);
//     setChoosedCategory(()=>
//     {
//       return(initialChoosedCategory.value);
//       // console.log(choosedCategory);
//     }
//     );
//   }
//   return(
//         <>
//         {/* <Navbar/> */}
//          {/* <h1>HOME</h1> */}
//         <div id="fp1">
//         <form action="#">
//           <select name="category" id="category">
//             <option id="options" value=""disabled selected hidden>SELECT THE CATEGORY</option>
//           {category?.map((value,index)=>
//           {
//             return(
//               <>
//               <option id="options" key={index} value={value.category}>{value.category}</option>
//               </>
//              );
//           })}
//           </select>
//           <input type="submit" value="search" id="search" onClick={showCategory} />
//          </form>
//         </div> 
//          {/* {console.log(category)} */}
//          {/* <h1>{choosedCategory}</h1> */}
//          {/* {console.log(entireProducts)} */}
//          <div id="card-parent">
//          {choosedCategory?
//          entireProducts.map((value,index)=>
//          {
//           if(choosedCategory==value.category)
//           {
//             return(
//               <>
//                 <div id="card">
//                   <p><b>PRODUCT NAME</b> : {value.productName}</p>
//                   <p><b>BRAND</b> : {value.brand}</p>
//                   <p><b>PRICE</b> : {value.price}</p>
//                   <p><b>ORIGIN</b> : {value.origin}</p>
//                   <p><b>SELLER</b> : {value.seller}</p>
//                   <p><b>STOCK</b> : {value.stock}</p>
//                 </div>
//               </>
//             )
//           }
//         }):
//          console.log("no products")
//         }
//          </div>
//         </>
//       );
// }
// export default Home;
import { useEffect, useState} from "react";
import "./home.css";
import"bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.bundle.min.js";
// redux
import{useDispatch, useSelector} from "react-redux";
import { deleteUser } from "./slices/userSlice";
import { useNavigate } from "react-router-dom";

function Home()
{
  let navigate=useNavigate();
  let chct=useSelector((state)=>
    {
       return(state.userInfo.users[0].chct);
    });
  let st=useSelector((state)=>
    {
      return(state.userInfo.users[0].st);
    });
  let[category,setCategory]=useState([]);
  let[choosedCategory,setChoosedCategory]=useState("");
  let[search,setSearch]=useState("");
  let[min_price,setMin_price]=useState("");
  let[max_price,setMax_price]=useState("");
  let[entireProducts,setEntireProducts]=useState([]);
  let[sample,setSample]=useState(0);
  useEffect(()=>{
    async function fun()
    {
        try
        {
          let responsemetadata=await fetch("http://localhost:8000/api/v1/category"); 
          let actualdata=await responsemetadata.json();
          // console.log(actualdata);
          // let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${encodeURIComponent(choosedCategory)}&search=${encodeURIComponent(search)}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`); 
          let totalProducts=await fetch(`http://localhost:8000/api/v1/filter?category=${encodeURIComponent(choosedCategory)}&search=${encodeURIComponent(search)}&min_price=${encodeURIComponent(min_price)}&max_price=${encodeURIComponent(max_price)}`); 
          let totalProductsData=await totalProducts.json();
          // console.log(totalProductsData);
          if(actualdata)
          {
            setCategory(actualdata.CATEGORY);
          }
          // console.log(category);
          if(totalProductsData)
          {
            setEntireProducts(totalProductsData.PRODUCTS);
          }
          console.log(totalProductsData);
        //   if(totalProductsData.PRODUCTS.length==0)
        //   {
        //       setMin_price(()=>
        //       {
        //         return("");
        //       });
        //       setMax_price(()=>
        //       {
        //         return("");
        //       });
        //  }
        //  console.log(entireProducts);
        }
        catch(error)
        {
          console.log("-----------");
          console.log(error);
        }
    }
    fun();
    setChoosedCategory(()=>
      {
        return(chct);
        // console.log(choosedCategory);
      }
      );
      setSearch(()=>
      {
        return(st);
        // console.log(choosedCategory);
      }
      );
},[choosedCategory,search,min_price,max_price,chct,st,sample]);
  const showCategory=(event)=>
  {
    event.preventDefault();
    const initialChoosedCategory=document.getElementById("category");
    // console.log(initialchoosedCategory);
    const searchedText=document.getElementById("search-box");
    // console.log(searchedText);
    setChoosedCategory(()=>
    {
      return(initialChoosedCategory.value);
      // console.log(choosedCategory);
    }
    );
    setSearch(()=>
    {
      return(searchedText.value);
      // console.log(choosedCategory);
    }
    );
  }
  // showing filter options---------------------------------
  const minvl=(event)=>
  {
    const minPriceValue=document.getElementById("min-price");
    setMin_price(()=>
      {
        return(minPriceValue.value);
      });
  }
  const maxvl=(event)=>
  {
      const maxPriceValue=document.getElementById("max-price");
      setMax_price(()=>
      {
        return(maxPriceValue.value);
      });
  }
//   const filter=(event)=>
//   {
//       event.preventDefault();
//       const minPriceValue=document.getElementById("min-price");
//       // console.log(minPriceValue.value);
//       const maxPriceValue=document.getElementById("max-price");
//       // console.log(maxPriceValue.value);
//       setMin_price(()=>
//       {
//         return(minPriceValue.value);
//       });
//       setMax_price(()=>
//       {
//         return(maxPriceValue.value);
//       });
//       // console.log(min_price);
//       // console.log(max_price);
//  }
  // const closeFilter=(event)=>
  // {
  //  event.preventDefault();
  //  let filterForm=document.getElementById("filter-options-container");
  //  console.log(filterForm);
   
  // //  filterForm.style.cssText="display:hidden";
  //   setSample(()=>
  //   {
  //    return(1);
  //   });
  //   setMin_price(()=>
  //   {
  //    return("");
  //   });
  //   setMax_price(()=>
  //   {
  //    return("");
  //   });
  // }
  // if(choosedCategory)
  // {
  //   navigate("/ProductsShow");
  //   setChoosedCategory(()=>
  //   {
  //     return("");
  //   });
  // }
  return(
        <>
        {/* <Navbar/> */}
        {/* <h1>HOME</h1> */}
        {/* <div id="fp1">
        <form action="#">
          <select name="category" id="category">
            <option id="options" value=""disabled selected hidden>CATEGORY</option>
          {category?.map((value,index)=>
          {
            return(
              <>
              <option id="options" key={index} value={value.category}>{value.category}</option>
              </>
             );
          })}
          </select>
          <input id="search-box" type="text" placeholder="search the product"/>
          <input type="submit" value="🔎" id="search-button" onClick={showCategory} />
         </form>
        </div>  */}
        {/* Showing filter options ------------------------------------------------ */}
        {(choosedCategory||search)?
        <div className="filter-options-container" id="filter-options-container">
        <form action="#">
          <label htmlFor="min-price">MIN PRICE :</label>
          <input id="min-price"type="text" onChange={minvl} />
          <label htmlFor="max-price">MAX PRICE :</label>
          <input id="max-price"type="text" onChange={maxvl}/>
        </form>
      </div>
        :
        console.log("NO NEED FOR FILTER OPTIONS")
        }
        {/* {entireProducts?.length>0&&(choosedCategory||search)?
        <div className="filter-options-container">
        <form action="#">
          <label htmlFor="min-price">MIN PRICE :</label>
          <input id="min-price"type="text" />
          <label htmlFor="max-price">MAX PRICE :</label>
          <input id="max-price"type="text" />
          <input id="filter-button" type="submit" value="filter" onClick={filter} />
        </form>
      </div>
        :
        console.log("NO NEED FOR FILTER OPTIONS")
        } */}
        {/* {entireProducts?.length==0&&(min_price||max_price)?
        <div className="filter-options-container">
        <form action="#">
          <label htmlFor="min-price">MIN PRICE : </label>
          <input id="min-price"type="text"/>
          <label htmlFor="max-price">MAX PRICE : </label>
          <input id="max-price"type="text"/>
          <input id="filter-button" type="submit" value="filter" onClick={filter} />
          <input type="range" />
        </form>
      </div>
        :
        console.log("NO NEED FOR FILTER OPTIONS")
        } */}
        {/* carousel------------------------------------------------------ */}
        <div className="carousel-cont">
          {choosedCategory==""&&search==""?
          // add carousel-dark class in below tag if you want black variant
          <div id="carouselExampleDark" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="10000">
    <img src="./images/CI_1_1.png" alt="1"/>
      
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="2000">
    <img src="./images/CI_2_2.png" alt="2"/>
      

      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
    <img src="./images/CI_3_3.png" alt="3"/>
      
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>:
          console.log("NO-CAROUSEL")
    }
          </div>
        <div id="card-parent">
         {choosedCategory||search?
         //  Here,We are using another condition using ternary operator within ternary operator
         entireProducts.length>0?
         entireProducts.map((value,index)=>
         {
           return(
                <>
                  <div id="card">
                    <p><b>PRODUCT NAME</b> : {value.productName}</p>
                    <p><b>BRAND</b> : {value.brand}</p>
                    <p><b>PRICE</b> : {value.price}</p>
                    <p><b>ORIGIN</b> : {value.origin}</p>
                    <p><b>SELLER</b> : {value.seller}</p>
                    <p><b>STOCK</b> : {value.stock}</p>
                  </div>
                </>
              )
          })
         :
         <div className="empty-product-message-container">
          <h3 id="empty-products-message">😣THERE IS NO PRODUCTS RELATED TO YOUR SEARCH</h3>
          {console.log(min_price,max_price)}
         </div>
        :
        category?.map((value,index)=>
          {
            return(
               <>
                <div id="card">
                   <p><b>{value.category}</b></p>
                 </div>
               </>
             )
         })
         
        }
        </div>
        {/* <button className="btn btn-primary">BOOTSTRAP</button> */}
        {/* {console.log(category)} */}
        {/* {console.log(choosedCategory); */}
        {/* {console.log(search)} */}
        {/* {console.log(entireProducts)} */}
        {/* {min_price[0]} */}
        {/* {console.log(min_price)}
        {console.log(max_price)} */}
        {/* {console.log("-----------------")}
        {console.log(entireProducts)}
        {console.log(window.screen.width)}
        {console.log(chct)}
        {console.log(st)}
        {console.log(choosedCategory)}
        {console.log(search)} */}
        {/* {console.log("oj9pjp9")} */}
        {/* {console.log(entireProducts)}
        {console.log(max_price)} */}
        </>
      );
}
export default Home;
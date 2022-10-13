import {useEffect, useState} from 'react';
import shopcakeApi from '../api/shopCake';
import { Products, ProducttResponseAll } from '../interfaces/appIterfaces';
import { ProductByID, ProductID } from '../interfaces/interfaceProduct';
export const useProducts = () => {

const [simpleProductList, setSimpleProductList] = useState<any[]>([]);

const [productoSearch, setProductSearch] = useState<any>();

const [productoID, setProductId] = useState<ProductID>();

const [dataProduct, setDataProduct] = useState<any>()

const [image, setImage] = useState();

const url = '/get_products';

const saveProducts = async(obj: any, image:any) => {
  const resp = await shopcakeApi.post<ProductByID>('save_product', obj);
  //console.log(resp.data.product._id)
  uploadImageProduct(image, resp.data.product._id)
}
 
const deleteProduct = async(id:string) => {
  const resp = await shopcakeApi.delete<any>(`/product_delete/${id}`);
  
  setSimpleProductList(resp.data.products);
  
}
const loadProducts = async() => {
    const resp = await shopcakeApi.get<ProducttResponseAll>(url);
    
    setSimpleProductList(resp.data.products);
    
}

const getProductBySearch = async(name:string) => {
  const resp = await shopcakeApi.get<ProducttResponseAll>(`/search-product/${name}`);
  
  console.log(resp.data.products);
  
  
}


const getProductById = async(id:any) => {
  const resp = await shopcakeApi.get<ProductByID>(`/get-product/${id}`);
  
  setProductId(resp.data.product);
  
  
}

const ProductUpdate = async( producto: any) => {
  console.log(producto)
  const resp = await shopcakeApi.put<ProducttResponseAll>(`product_update/${producto._id}`, producto);

}

const uploadImageProduct = async( data:any, id: string ) => {
  const fileToUpload = {
      uri: data.assets[0].uri,
      type: data.assets[0].type,
      name: data.assets[0].fileName,
  }

  const formData = new FormData();
  formData.append('file0', fileToUpload);

  try {
    const resp = await shopcakeApi.post(`/upload-product/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });



} catch (error: any) {
    console.log(error.response);
}


}

  return {
    simpleProductList, dataProduct, productoSearch, productoID,getProductBySearch, deleteProduct,saveProducts,  loadProducts, ProductUpdate, uploadImageProduct, getProductById
  }
}

import { useEffect, useState, useContext, useRef } from "react";
import shopcakeApi from "../api/shopCake";
import { Sale, Pedidos } from '../interfaces/appIterfaces';
import { AuthContext } from '../context/AuthContext';
import {  Pedido, PedidoId } from '../interfaces/IdSaleInterface';
import { SaveSales } from '../interfaces/saleInterface';



export const useSales = () => {    

    const salesInMemory = useRef<Sale[]>([]);
    const salesInMemoryId = useRef<PedidoId>()


    const {user} = useContext(AuthContext);

    const [sale, setSale] = useState<any[]>([]);
    const [saleAll, setSaleAll] = useState<any[]>([]);

    const [saleId, setSaleId] = useState<PedidoId[]>([]);
    const [statusEnd, setStatusEnd] = useState<any[]>([]);

    const saleById = async(id:string) => {
      const resp = await shopcakeApi.get<Pedido>(`/sale/${id}`);
      salesInMemoryId.current = resp.data.sale;
      
    }
     
    const getSale = async( ) => {

      const resp = await shopcakeApi.get<Pedidos>(`/sales`);
      
      salesInMemory.current = resp.data.sales;
      setSale(salesInMemory.current);
      filterByStatus('null');
    }


    const loadSale = async( ) => {

      const resp = await shopcakeApi.get<Pedidos>(`/search_sales/${user?.nombre }`);
      
      salesInMemory.current = resp.data.sales;

      filterByStatus('null');
    }

    const filterByStatus = (status:string, tipeAdmin?:string) => {
      if(status === 'Empaquetado'){
        var newStatusSend = salesInMemory.current.filter(item => (item.estado === 'Empaquetado' || item.estado === 'Enviado' || item.estado === 'Preparando' ));

      }else{
        var newStatusSend = salesInMemory.current.filter(item => (item.estado === status ));

      }
      if(tipeAdmin === 'true'){
        setSaleAll(newStatusSend)
      }else{
        setSale(newStatusSend)
      }
      
    }

    
    
    useEffect(() => {
      loadSale();     
    }, []) 

    const saveSaleUser = async(sale:any) => {
      const resp = await shopcakeApi.post<SaveSales>(`/save_sales`, sale);
      console.log(resp.data);
    }
    const updateSaleUser = async(sale:any, id:string) => {
      const resp = await shopcakeApi.put<SaveSales>(`/update_sale/${id}`, sale);
      console.log(resp.data);
    }

    const deleteSale = async(id:string) => {
      const resp = await shopcakeApi.delete(`/sale_delete/${id}`);
    }

    return {
      sale, saleAll, filterByStatus, saleById, getSale, saleId,  salesInMemoryId, saveSaleUser,updateSaleUser, deleteSale
    }
}

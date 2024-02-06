import React,{useEffect} from 'react';
import Sidebar from './Sidebar';
import "./Dashboard.css";
import {Typography} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { Doughnut, Line } from"react-chartjs-2";
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    DoughnutController, // 如果使用 Doughnut 或 Pie 图表
    PieController, // 如果使用 Pie 图表
    BarController, // 如果使用 Bar 图表
    // 可能还需要注册其他控制器和元素，根据您的需要
  } from 'chart.js';
  
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    DoughnutController,
    PieController,
    BarController
    // 其他需要的组件
  );


const Dashboard = () => {


  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
   products.forEach((item) => {
    if( item.Stock === 0){
      outOfStock +=1
    }
   });

   useEffect(() => {

    dispatch(getAdminProducts());
    
    dispatch(getAllOrders());

    dispatch(getAllUsers());

},[dispatch]);

    let totalAmount = 0;
    orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    })

    const lineState = {
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197, 72, 49"],
                data:[0, totalAmount]
            },
        ],
    };

    const options = {
        scales: {
          x: {
            type: 'category',
          },
          y: {
            type: 'linear',
          },
        },
      };

    const doughnutState = {
        labels:["Out of Stock" , "InStock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6800B4"],
                hoverBackgroundColor:["#4B50000","#35014F"],
                data:[ outOfStock, products.length - outOfStock],
            },
        ],
    }


  return (
    <div className='dashboard'>
        <Sidebar/>

        <div className="dashboardContainer">

        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
            <div>
                <p>
                    Total Amount <br/> ${totalAmount}
                </p>
            </div>
            <div className="dashboardSummaryBox2">
                <Link to="/admin/products">
                    <p>Product</p>
                    <p>{products && products.length}</p>
                    
                </Link>
                <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                </Link>
        
                </div>

                <div className="lineChart">
                <Line data={lineState} options={options} />
               </div>
               <div className="doughnutChart">
                <Doughnut data={doughnutState} options={options}/>
               </div>
            </div>

           

        </div>
    </div>
  )
}

export default Dashboard
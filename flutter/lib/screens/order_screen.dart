import 'dart:convert';
import 'package:flutter/material.dart';
import '../models/order.dart';
import '../widgets/order_table.dart';
import '../widgets/order_form.dart';
import '../widgets/search_bar.dart';
import '../data/order_data.dart';

class OrderScreen extends StatefulWidget {
  const OrderScreen({super.key});

  @override
  _OrderScreenState createState() => _OrderScreenState();
}

class _OrderScreenState extends State<OrderScreen> {
  List<Order> orders = [];

  @override
  void initState() {
    super.initState();
    loadOrders();
  }

  void loadOrders() {
    List<dynamic> jsonList = jsonDecode(orderJson);
    orders = jsonList.map((e) => Order.fromJson(e)).toList();
  }

  void addOrder(Order order) {
    setState(() {
      orders.add(order);
    });
  }

  void searchOrders(String query) {
    setState(() {
      if (query.isEmpty) {
        loadOrders();
      } else {
        orders = orders.where((o) => o.itemName.toLowerCase().contains(query.toLowerCase())).toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Order List")),
      body: Column(
        children: [
          SearchBarWidget(onSearch: searchOrders),
          Expanded(child: OrderTable(orders: orders)),
          OrderForm(onAddOrder: addOrder),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../models/order.dart';

class OrderTable extends StatelessWidget {
  final List<Order> orders;

  const OrderTable({super.key, required this.orders});

  @override
  Widget build(BuildContext context) {
    return DataTable(
      columns: const [
        DataColumn(label: Text('Item')),
        DataColumn(label: Text('Item Name')),
        DataColumn(label: Text('Price')),
        DataColumn(label: Text('Currency')),
        DataColumn(label: Text('Quantity')),
      ],
      rows: orders
          .map(
            (order) => DataRow(cells: [
          DataCell(Text(order.item)),
          DataCell(Text(order.itemName)),
          DataCell(Text("\$${order.price.toStringAsFixed(2)}")),
          DataCell(Text(order.currency)),
          DataCell(Text(order.quantity.toString())),
        ]),
      )
          .toList(),
    );
  }
}

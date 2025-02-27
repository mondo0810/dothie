import 'package:flutter/material.dart';
import '../models/order.dart';

class OrderForm extends StatefulWidget {
  final Function(Order) onAddOrder;

  const OrderForm({super.key, required this.onAddOrder});

  @override
  _OrderFormState createState() => _OrderFormState();
}

class _OrderFormState extends State<OrderForm> {
  final _formKey = GlobalKey<FormState>();
  final _itemController = TextEditingController();
  final _itemNameController = TextEditingController();
  final _priceController = TextEditingController();
  final _currencyController = TextEditingController();
  final _quantityController = TextEditingController();

  void _submitOrder() {
    if (_formKey.currentState!.validate()) {
      final newOrder = Order(
        item: _itemController.text,
        itemName: _itemNameController.text,
        price: double.parse(_priceController.text),
        currency: _currencyController.text,
        quantity: int.parse(_quantityController.text),
      );
      widget.onAddOrder(newOrder);
      _formKey.currentState!.reset();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            TextFormField(controller: _itemController, decoration: const InputDecoration(labelText: "Item")),
            TextFormField(controller: _itemNameController, decoration: const InputDecoration(labelText: "Item Name")),
            TextFormField(controller: _priceController, decoration: const InputDecoration(labelText: "Price"), keyboardType: TextInputType.number),
            TextFormField(controller: _currencyController, decoration: const InputDecoration(labelText: "Currency")),
            TextFormField(controller: _quantityController, decoration: const InputDecoration(labelText: "Quantity"), keyboardType: TextInputType.number),
            const SizedBox(height: 10),
            ElevatedButton(onPressed: _submitOrder, child: const Text("Add Order"))
          ],
        ),
      ),
    );
  }
}

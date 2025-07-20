import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, CircleCheck as CheckCircle, Circle as XCircle, Package, Phone } from 'lucide-react-native';

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  profit: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'أحمد محمد',
    customerPhone: '+966501234567',
    productName: 'ساعة ذكية رياضية',
    quantity: 1,
    totalPrice: 200,
    profit: 50,
    status: 'pending',
    orderDate: '2024-01-15',
  },
  {
    id: '2',
    customerName: 'فاطمة علي',
    customerPhone: '+966507654321',
    productName: 'سماعات لاسلكية',
    quantity: 2,
    totalPrice: 240,
    profit: 80,
    status: 'confirmed',
    orderDate: '2024-01-14',
  },
  {
    id: '3',
    customerName: 'محمد السعد',
    customerPhone: '+966509876543',
    productName: 'حقيبة ظهر عصرية',
    quantity: 1,
    totalPrice: 75,
    profit: 30,
    status: 'shipped',
    orderDate: '2024-01-13',
  },
  {
    id: '4',
    customerName: 'نورا أحمد',
    customerPhone: '+966502468135',
    productName: 'كاميرا فورية',
    quantity: 1,
    totalPrice: 180,
    profit: 60,
    status: 'delivered',
    orderDate: '2024-01-12',
  },
];

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'confirmed': return '#3B82F6';
      case 'shipped': return '#8B5CF6';
      case 'delivered': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'مؤكد';
      case 'shipped': return 'تم الشحن';
      case 'delivered': return 'تم التسليم';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} color={getStatusColor(status)} />;
      case 'confirmed': return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'shipped': return <Package size={16} color={getStatusColor(status)} />;
      case 'delivered': return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'cancelled': return <XCircle size={16} color={getStatusColor(status)} />;
      default: return <Clock size={16} color={getStatusColor(status)} />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    Alert.alert('تم التحديث', 'تم تحديث حالة الطلب بنجاح');
  };

  const callCustomer = (phone: string) => {
    Alert.alert('اتصال', `سيتم الاتصال بالرقم: ${phone}`);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>طلب #{order.id}</Text>
          <Text style={styles.orderDate}>{order.orderDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          {getStatusIcon(order.status)}
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{order.customerName}</Text>
        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => callCustomer(order.customerPhone)}
        >
          <Phone size={16} color="#3B82F6" />
          <Text style={styles.phoneText}>{order.customerPhone}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{order.productName}</Text>
        <Text style={styles.quantity}>الكمية: {order.quantity}</Text>
      </View>

      <View style={styles.priceInfo}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>المبلغ الإجمالي:</Text>
          <Text style={styles.totalPrice}>${order.totalPrice}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>ربحي:</Text>
          <Text style={styles.profit}>+${order.profit}</Text>
        </View>
      </View>

      {order.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => updateOrderStatus(order.id, 'confirmed')}
          >
            <CheckCircle size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>تأكيد</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => updateOrderStatus(order.id, 'cancelled')}
          >
            <XCircle size={16} color="#FFFFFF" />
            <Text style={styles.buttonText}>إلغاء</Text>
          </TouchableOpacity>
        </View>
      )}

      {order.status === 'confirmed' && (
        <TouchableOpacity
          style={styles.shipButton}
          onPress={() => updateOrderStatus(order.id, 'shipped')}
        >
          <Package size={16} color="#FFFFFF" />
          <Text style={styles.buttonText}>تم الشحن</Text>
        </TouchableOpacity>
      )}

      {order.status === 'shipped' && (
        <TouchableOpacity
          style={styles.deliverButton}
          onPress={() => updateOrderStatus(order.id, 'delivered')}
        >
          <CheckCircle size={16} color="#FFFFFF" />
          <Text style={styles.buttonText}>تم التسليم</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalProfit = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + order.profit, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الطلبات</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{pendingOrders}</Text>
          <Text style={styles.statLabel}>طلبات في الانتظار</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>${totalProfit}</Text>
          <Text style={styles.statLabel}>إجمالي الأرباح</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customerInfo: {
    marginBottom: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  phoneText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  productInfo: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceInfo: {
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  profit: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#10B981',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  shipButton: {
    backgroundColor: '#8B5CF6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  deliverButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});
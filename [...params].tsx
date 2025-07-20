import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ShoppingCart, User, Phone, MapPin, CreditCard } from 'lucide-react-native';

// محاكاة بيانات المنتج
const getProductById = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'ساعة ذكية رياضية',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      description: 'ساعة ذكية مقاومة للماء مع مراقب معدل ضربات القلب',
      features: ['مقاومة للماء', 'مراقب معدل ضربات القلب', 'GPS مدمج', 'بطارية تدوم 7 أيام'],
    },
    '2': {
      id: '2',
      name: 'سماعات لاسلكية',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      description: 'سماعات بلوتوث عالية الجودة مع إلغاء الضوضاء',
      features: ['إلغاء الضوضاء النشط', 'بطارية 30 ساعة', 'مقاومة للعرق', 'صوت عالي الجودة'],
    },
  };
  return products[id as keyof typeof products];
};

export default function BuyScreen() {
  const params = useLocalSearchParams();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const productId = params.product as string;
  const sellerId = params.seller as string;
  const sellerName = params.sellerName as string;
  const price = parseFloat(params.price as string);
  const originalPrice = parseFloat(params.originalPrice as string);

  const product = getProductById(productId);

  const handleOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // هنا سيتم إرسال الطلب إلى الخادم
    const orderData = {
      productId,
      productName: product?.name,
      sellerId,
      sellerName,
      customerInfo,
      price,
      originalPrice,
      profit: price - originalPrice,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    console.log('Order Data:', orderData);

    Alert.alert(
      'تم إرسال الطلب',
      'شكراً لك! تم إرسال طلبك بنجاح. سيتم التواصل معك قريباً لتأكيد الطلب.',
      [
        {
          text: 'موافق',
          onPress: () => router.push('/'),
        },
      ]
    );
  };

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>المنتج غير موجود</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* صورة المنتج */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* معلومات المنتج */}
        <View style={styles.productSection}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.sellerInfo}>يباع بواسطة: {sellerName}</Text>
          </View>

          {/* مميزات المنتج */}
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>المميزات:</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* نموذج الطلب */}
        <View style={styles.orderSection}>
          <Text style={styles.sectionTitle}>معلومات الطلب</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <User size={20} color="#6B7280" />
              <Text style={styles.inputLabel}>الاسم الكامل *</Text>
            </View>
            <TextInput
              style={styles.input}
              value={customerInfo.name}
              onChangeText={(text) => setCustomerInfo({...customerInfo, name: text})}
              placeholder="أدخل اسمك الكامل"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Phone size={20} color="#6B7280" />
              <Text style={styles.inputLabel}>رقم الهاتف *</Text>
            </View>
            <TextInput
              style={styles.input}
              value={customerInfo.phone}
              onChangeText={(text) => setCustomerInfo({...customerInfo, phone: text})}
              placeholder="أدخل رقم هاتفك"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <MapPin size={20} color="#6B7280" />
              <Text style={styles.inputLabel}>العنوان *</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={customerInfo.address}
              onChangeText={(text) => setCustomerInfo({...customerInfo, address: text})}
              placeholder="أدخل عنوانك الكامل"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <CreditCard size={20} color="#6B7280" />
              <Text style={styles.inputLabel}>ملاحظات إضافية</Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={customerInfo.notes}
              onChangeText={(text) => setCustomerInfo({...customerInfo, notes: text})}
              placeholder="أي ملاحظات أو طلبات خاصة"
              multiline
              numberOfLines={2}
            />
          </View>
        </View>

        {/* ملخص الطلب */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>ملخص الطلب</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>المنتج:</Text>
            <Text style={styles.summaryValue}>{product.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>السعر:</Text>
            <Text style={styles.summaryPrice}>${price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>البائع:</Text>
            <Text style={styles.summaryValue}>{sellerName}</Text>
          </View>
        </View>

        {/* زر الطلب */}
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.orderButtonText}>تأكيد الطلب</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
  },
  sellerInfo: {
    fontSize: 14,
    color: '#6B7280',
  },
  featuresSection: {
    marginTop: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureBullet: {
    fontSize: 16,
    color: '#3B82F6',
    marginRight: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#4B5563',
  },
  orderSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  summarySection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  summaryPrice: {
    fontSize: 18,
    color: '#059669',
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 12,
    gap: 10,
  },
  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 30,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreditCard as Edit3, Plus, DollarSign, Eye, Search, Menu, X, User, Package, TrendingUp, Settings, CircleHelp as HelpCircle, LogOut, ChevronRight, Bell, Chrome as Home, ShoppingCart, ChartBar as BarChart3, CircleUser as UserCircle, Phone, Mail, MapPin, Clock } from 'lucide-react-native';
import LinkGenerator from '@/components/LinkGenerator';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.8;

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  myPrice: number;
  category: string;
  description: string;
  profit: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ساعة ذكية رياضية',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    originalPrice: 150,
    myPrice: 200,
    category: 'إلكترونيات',
    description: 'ساعة ذكية مقاومة للماء مع مراقب معدل ضربات القلب',
    profit: 50,
  },
  {
    id: '2',
    name: 'سماعات لاسلكية',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    originalPrice: 80,
    myPrice: 120,
    category: 'إلكترونيات',
    description: 'سماعات بلوتوث عالية الجودة مع إلغاء الضوضاء',
    profit: 40,
  },
  {
    id: '3',
    name: 'حقيبة ظهر عصرية',
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    originalPrice: 45,
    myPrice: 75,
    category: 'أزياء',
    description: 'حقيبة ظهر مقاومة للماء مع جيوب متعددة',
    profit: 30,
  },
  {
    id: '4',
    name: 'كاميرا فورية',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    originalPrice: 120,
    myPrice: 180,
    category: 'إلكترونيات',
    description: 'كاميرا فورية ملونة مع فيلم',
    profit: 60,
  },
];

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarAnimation] = useState(new Animated.Value(-SIDEBAR_WIDTH));

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnimation, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handlePriceUpdate = () => {
    if (selectedProduct && newPrice) {
      const updatedProducts = products.map(product =>
        product.id === selectedProduct.id
          ? {
              ...product,
              myPrice: parseFloat(newPrice),
              profit: parseFloat(newPrice) - product.originalPrice,
            }
          : product
      );
      setProducts(updatedProducts);
      setModalVisible(false);
      setNewPrice('');
      Alert.alert('تم التحديث', 'تم تحديث سعر المنتج بنجاح');
    }
  };

  const openPriceModal = (product: Product) => {
    setSelectedProduct(product);
    setNewPrice(product.myPrice.toString());
    setModalVisible(true);
  };

  const openLinkGenerator = (product: Product) => {
    setSelectedProduct(product);
    setLinkModalVisible(true);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <View style={styles.gridProductCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory} numberOfLines={1}>{product.category}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          <Text style={styles.myPrice}>${product.myPrice}</Text>
          <Text style={styles.profit}>+${product.profit}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.smallEditButton}
            onPress={() => openPriceModal(product)}
          >
            <Edit3 size={12} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.smallViewButton}>
            <Eye size={12} color="#3B82F6" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.smallLinkButton}
            onPress={() => openLinkGenerator(product)}
          >
            <Text style={styles.smallLinkButtonText}>رابط</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header مبسط */}
      <View style={styles.simpleHeader}>
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Menu size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>منتجاتي</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* شريط البحث */}
      <View style={styles.searchContainer}>
        <Search size={16} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="البحث في المنتجات..."
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* القائمة الجانبية */}
      {sidebarVisible && (
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={toggleSidebar}
        />
      )}
      
      <Animated.View style={[styles.sidebar, { left: sidebarAnimation }]}>
        <View style={styles.sidebarHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleSidebar}>
            <X size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.sidebarTitle}>TANAMIRT</Text>
        </View>

        <ScrollView style={styles.sidebarContent} showsVerticalScrollIndicator={false}>
          {/* تسجيل الدخول / إنشاء حساب */}
          <TouchableOpacity style={styles.loginButton}>
            <User size={20} color="#FFFFFF" />
            <Text style={styles.loginButtonText}>تسجيل الدخول / إنشاء حساب</Text>
          </TouchableOpacity>

          {/* الأقسام الرئيسية */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>الأقسام الرئيسية</Text>
            
            <TouchableOpacity style={styles.menuItem}>
              <Home size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الصفحة الرئيسية</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Package size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>منتجاتي</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <ShoppingCart size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الطلبات</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <BarChart3 size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>تحليل الأرباح</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <UserCircle size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الملف الشخصي</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* معلومات مهمة */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>معلومات مهمة</Text>
            
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>كيف يعمل التطبيق؟</Text>
              <Text style={styles.infoText}>
                • أضف منتجات من مصادر موثوقة{'\n'}
                • حدد سعر البيع والربح المطلوب{'\n'}
                • أنشئ روابط مخصصة للمشاركة{'\n'}
                • تابع الطلبات والأرباح
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>نصائح للنجاح</Text>
              <Text style={styles.infoText}>
                • اختر منتجات عالية الجودة{'\n'}
                • حدد أسعار تنافسية{'\n'}
                • استخدم وصف جذاب للمنتجات{'\n'}
                • تفاعل مع العملاء بسرعة
              </Text>
            </View>
          </View>

          {/* معلومات الاتصال */}
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>تواصل معنا</Text>
            
            <TouchableOpacity style={styles.contactItem}>
              <Phone size={18} color="#3B82F6" />
              <Text style={styles.contactText}>+966 50 123 4567</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactItem}>
              <Mail size={18} color="#3B82F6" />
              <Text style={styles.contactText}>support@tanamirt.com</Text>
            </TouchableOpacity>

            <View style={styles.contactItem}>
              <Clock size={18} color="#6B7280" />
              <Text style={styles.contactText}>ساعات العمل: 9 صباحاً - 6 مساءً</Text>
            </View>
          </View>

          {/* الإعدادات */}
          <View style={styles.menuSection}>
            <TouchableOpacity style={styles.menuItem}>
              <Settings size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>الإعدادات</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <HelpCircle size={20} color="#6B7280" />
              <Text style={styles.menuItemText}>المساعدة</Text>
              <ChevronRight size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>تعديل السعر</Text>
            
            {selectedProduct && (
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                <Text style={styles.modalOriginalPrice}>
                  السعر الأصلي: ${selectedProduct.originalPrice}
                </Text>
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>السعر الجديد:</Text>
              <TextInput
                style={styles.priceInput}
                value={newPrice}
                onChangeText={setNewPrice}
                keyboardType="numeric"
                placeholder="أدخل السعر الجديد"
              />
            </View>

            {newPrice && selectedProduct && (
              <View style={styles.profitPreview}>
                <Text style={styles.profitText}>
                  الربح المتوقع: ${(parseFloat(newPrice) - selectedProduct.originalPrice).toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>إلغاء</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handlePriceUpdate}
              >
                <Text style={styles.saveButtonText}>حفظ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={linkModalVisible}
        onRequestClose={() => setLinkModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.linkModalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLinkModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            {selectedProduct && (
              <LinkGenerator
                product={selectedProduct}
                sellerId="user123"
                sellerName="محمد أحمد"
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  simpleHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1F2937',
  },
  gridContainer: {
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 3,
  },
  productCategory: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  priceContainer: {
    marginBottom: 10,
  },
  originalPrice: {
    fontSize: 10,
    color: '#EF4444',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  myPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  profit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  smallEditButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  smallViewButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  smallLinkButton: {
    flex: 1,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  smallLinkButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  viewButtonText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  modalProductInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  modalProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  modalOriginalPrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  priceInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  profitPreview: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  profitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  linkModalContent: {
    backgroundColor: '#F9FAFB',
    margin: 10,
    borderRadius: 12,
    maxHeight: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: '#FFFFFF',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  sidebarContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginVertical: 20,
    gap: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 25,
  },
  menuSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#F0F9FF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 18,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#374151',
  },
});
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react-native';

const analyticsData = {
  totalRevenue: 1250,
  totalProfit: 320,
  totalOrders: 15,
  totalProducts: 25,
  monthlyData: [
    { month: 'يناير', revenue: 450, profit: 120 },
    { month: 'فبراير', revenue: 380, profit: 95 },
    { month: 'مارس', revenue: 420, profit: 105 },
  ],
  topProducts: [
    { name: 'ساعة ذكية رياضية', sales: 8, profit: 400 },
    { name: 'سماعات لاسلكية', sales: 12, profit: 480 },
    { name: 'حقيبة ظهر عصرية', sales: 6, profit: 180 },
  ],
};

export default function AnalyticsScreen() {
  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color 
  }: { 
    title: string; 
    value: string; 
    icon: React.ReactNode; 
    color: string; 
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.statInfo}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const MonthCard = ({ month, revenue, profit }: { month: string; revenue: number; profit: number }) => (
    <View style={styles.monthCard}>
      <Text style={styles.monthName}>{month}</Text>
      <View style={styles.monthStats}>
        <View style={styles.monthStat}>
          <Text style={styles.monthStatLabel}>المبيعات</Text>
          <Text style={styles.monthRevenue}>${revenue}</Text>
        </View>
        <View style={styles.monthStat}>
          <Text style={styles.monthStatLabel}>الربح</Text>
          <Text style={styles.monthProfit}>${profit}</Text>
        </View>
      </View>
    </View>
  );

  const ProductCard = ({ name, sales, profit }: { name: string; sales: number; profit: number }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productSales}>{sales} مبيعة</Text>
      </View>
      <Text style={styles.productProfit}>${profit}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>تحليل الأرباح</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* إحصائيات عامة */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الإحصائيات العامة</Text>
          <View style={styles.statsGrid}>
            <StatCard
              title="إجمالي المبيعات"
              value={`$${analyticsData.totalRevenue}`}
              icon={<DollarSign size={24} color="#10B981" />}
              color="#10B981"
            />
            <StatCard
              title="إجمالي الأرباح"
              value={`$${analyticsData.totalProfit}`}
              icon={<TrendingUp size={24} color="#3B82F6" />}
              color="#3B82F6"
            />
            <StatCard
              title="عدد الطلبات"
              value={analyticsData.totalOrders.toString()}
              icon={<ShoppingCart size={24} color="#8B5CF6" />}
              color="#8B5CF6"
            />
            <StatCard
              title="عدد المنتجات"
              value={analyticsData.totalProducts.toString()}
              icon={<Package size={24} color="#F59E0B" />}
              color="#F59E0B"
            />
          </View>
        </View>

        {/* الأداء الشهري */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>الأداء الشهري</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.monthsContainer}>
              {analyticsData.monthlyData.map((month, index) => (
                <MonthCard
                  key={index}
                  month={month.month}
                  revenue={month.revenue}
                  profit={month.profit}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* أفضل المنتجات */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>أفضل المنتجات</Text>
          {analyticsData.topProducts.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              sales={product.sales}
              profit={product.profit}
            />
          ))}
        </View>

        {/* نصائح لزيادة الأرباح */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>نصائح لزيادة الأرباح</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>🎯 ركز على المنتجات الأكثر ربحية</Text>
              <Text style={styles.tipDescription}>
                السماعات اللاسلكية تحقق أعلى أرباح. فكر في زيادة الترويج لها.
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>📈 حسن هوامش الربح</Text>
              <Text style={styles.tipDescription}>
                متوسط هامش الربح الحالي 25%. يمكنك زيادته إلى 30% تدريجياً.
              </Text>
            </View>
            
            <View style={styles.tipCard}>
              <Text style={styles.tipTitle}>🛍️ أضف منتجات مكملة</Text>
              <Text style={styles.tipDescription}>
                أضف إكسسوارات للمنتجات الموجودة لزيادة قيمة الطلب الواحد.
              </Text>
            </View>
          </View>
        </View>
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
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  monthsContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingRight: 15,
  },
  monthCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    width: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  monthStats: {
    gap: 8,
  },
  monthStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  monthRevenue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
  },
  monthProfit: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 5,
  },
  productSales: {
    fontSize: 12,
    color: '#6B7280',
  },
  productProfit: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
  },
  tipsContainer: {
    gap: 15,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});
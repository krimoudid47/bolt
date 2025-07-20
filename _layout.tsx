import { Tabs } from 'expo-router';
import { Package, ShoppingCart, TrendingUp, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'المنتجات',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'الطلبات',
          tabBarIcon: ({ size, color }) => (
            <ShoppingCart size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'الأرباح',
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'الحساب',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
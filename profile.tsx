import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CircleHelp as HelpCircle, Star, Share2, LogOut, Bell, CreditCard, Shield, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const handleMenuPress = (item: string) => {
    Alert.alert('قريباً', `ميزة ${item} ستكون متاحة قريباً`);
  };

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تسجيل الخروج', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const MenuItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    textColor = '#1F2937'
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showArrow?: boolean;
    textColor?: string;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.menuItemText}>
          <Text style={[styles.menuItemTitle, { color: textColor }]}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <ChevronRight size={20} color="#9CA3AF" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>الحساب</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* معلومات المستخدم */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={40} color="#FFFFFF" />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>محمد أحمد</Text>
            <Text style={styles.userEmail}>mohammed@example.com</Text>
            <Text style={styles.userPhone}>+966 50 123 4567</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleMenuPress('تعديل الملف الشخصي')}
          >
            <Text style={styles.editButtonText}>تعديل</Text>
          </TouchableOpacity>
        </View>

        {/* إحصائيات سريعة */}
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>منتج</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>طلب</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$320</Text>
            <Text style={styles.statLabel}>ربح</Text>
          </View>
        </View>

        {/* قائمة الإعدادات */}
        <MenuSection title="الحساب">
          <MenuItem
            icon={<Settings size={20} color="#6B7280" />}
            title="الإعدادات"
            subtitle="إعدادات التطبيق والحساب"
            onPress={() => handleMenuPress('الإعدادات')}
          />
          <MenuItem
            icon={<Bell size={20} color="#6B7280" />}
            title="الإشعارات"
            subtitle="إدارة الإشعارات والتنبيهات"
            onPress={() => handleMenuPress('الإشعارات')}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#6B7280" />}
            title="طرق الدفع"
            subtitle="إدارة طرق الدفع والسحب"
            onPress={() => handleMenuPress('طرق الدفع')}
          />
        </MenuSection>

        <MenuSection title="الأمان">
          <MenuItem
            icon={<Shield size={20} color="#6B7280" />}
            title="الأمان والخصوصية"
            subtitle="كلمة المرور والأمان"
            onPress={() => handleMenuPress('الأمان والخصوصية')}
          />
        </MenuSection>

        <MenuSection title="الدعم">
          <MenuItem
            icon={<HelpCircle size={20} color="#6B7280" />}
            title="المساعدة والدعم"
            subtitle="الأسئلة الشائعة والدعم الفني"
            onPress={() => handleMenuPress('المساعدة والدعم')}
          />
          <MenuItem
            icon={<Star size={20} color="#6B7280" />}
            title="قيم التطبيق"
            subtitle="شاركنا رأيك في التطبيق"
            onPress={() => handleMenuPress('قيم التطبيق')}
          />
          <MenuItem
            icon={<Share2 size={20} color="#6B7280" />}
            title="شارك التطبيق"
            subtitle="ادع أصدقاءك لاستخدام التطبيق"
            onPress={() => handleMenuPress('شارك التطبيق')}
          />
        </MenuSection>

        <MenuSection title="">
          <MenuItem
            icon={<LogOut size={20} color="#EF4444" />}
            title="تسجيل الخروج"
            onPress={handleLogout}
            showArrow={false}
            textColor="#EF4444"
          />
        </MenuSection>

        {/* معلومات التطبيق */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>الإصدار 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 تطبيق إعادة البيع</Text>
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
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E7EB',
  },
  menuSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  appVersion: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 5,
  },
  appCopyright: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
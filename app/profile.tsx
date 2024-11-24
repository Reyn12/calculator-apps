import { View, Text, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Menggunakan warna yang sama dengan index.tsx
const colors = {
  dark: {
    background: '#090a1a',
    surface: '#0f0e2e',
    button: '#313131',
    text: '#fff',
    textSecondary: '#b0b0b0'
  }
};

const menuItems = [
  {
    title: 'Portofolio',
    subtitle: 'View my professional background',
    icon: 'briefcase-outline'
  },
  {
    title: 'See My Project',
    subtitle: 'Explore my latest works',
    icon: 'folder-open-outline'
  },
  {
    title: 'Hire Me',
    subtitle: 'Let\'s work together with me',
    icon: 'mail-outline'
  },
  {
    title: 'Social Media',
    subtitle: 'Connect with me',
    icon: 'share-social-outline'
  }
];

export default function Profile() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.dark.background,
    }}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40
        }}
      >
        {/* Profile Card */}
        <View style={{
          backgroundColor: colors.dark.surface,
          borderRadius: 20,
          marginHorizontal: 20,
          marginTop: 60,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          {/* Background Image */}
          <View style={{
            height: 160,
            width: '100%',
            position: 'relative'
          }}>
            <Image 
              source={require('./images/profile.jpg')}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover'
              }}
            />
            {/* Shadow Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(15, 14, 46, 0.8)', colors.dark.surface]}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
              }}
            />
          </View>

          {/* Profile Content */}
          <View style={{
            padding: 20,
            paddingTop: 60,
            alignItems: 'center',
          }}>
            {/* Profile Picture - Positioned absolute to overlap */}
            <View style={{
              position: 'absolute',
              top: -50,
              alignSelf: 'center',
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.dark.button,
              overflow: 'hidden',
              borderWidth: 4,
              borderColor: colors.dark.surface,
            }}>
              <Image 
                source={require('./images/profile.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover'
                }}
              />
            </View>

            {/* User Info */}
            <Text style={{
              color: colors.dark.textSecondary,
              fontSize: 16,
            }}>
              @muhreyy12_
            </Text>
            <Text style={{
              color: colors.dark.text,
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 5,
            }}>
              Muh Renaldi Maulana
            </Text>
            <Text style={{
              color: colors.dark.textSecondary,
              fontSize: 16,
              marginBottom: 15,
            }}>
              Bandung | CEO & Mobile Developer
            </Text>

            {/* Action Buttons */}
            <View style={{
              flexDirection: 'row',
              gap: 10,
            }}>
              {/* Follow Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.dark.button,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Ionicons 
                  name="person-add-outline"
                  size={20}
                  color={colors.dark.text}
                />
                <Text style={{
                  color: colors.dark.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  Follow
                </Text>
              </TouchableOpacity>

              {/* Message Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.dark.button,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Ionicons 
                  name="chatbubble-outline"
                  size={20}
                  color={colors.dark.text}
                />
                <Text style={{
                  color: colors.dark.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  Message
                </Text>
              </TouchableOpacity>

              {/* More Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: colors.dark.button,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                }}
              >
                <Ionicons 
                  name="ellipsis-horizontal"
                  size={20}
                  color={colors.dark.text}
                />
                <Text style={{
                  color: colors.dark.text,
                  fontSize: 14,
                  fontWeight: '500',
                }}>
                  More
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{
              color: colors.dark.textSecondary,
              fontSize: 16,
              marginHorizontal: 20,
              marginTop: 20,
            }}>
              I am a mobile developer with a passion for creating innovative and user-friendly apps.
            </Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={{
          backgroundColor: colors.dark.surface,
          borderRadius: 20,
          overflow: 'hidden',
          marginHorizontal: 20,
        }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
                borderBottomWidth: index < menuItems.length - 1 ? 1 : 0,
                borderBottomColor: colors.dark.button,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.dark.button,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
                <Ionicons 
                  name={item.icon}
                  size={24}
                  color={colors.dark.text}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  color: colors.dark.text,
                  fontSize: 16,
                  fontWeight: '500',
                  marginBottom: 4,
                }}>
                  {item.title}
                </Text>
                <Text style={{
                  color: colors.dark.textSecondary,
                  fontSize: 14,
                }}>
                  {item.subtitle}
                </Text>
              </View>
              <Ionicons 
                name="chevron-forward"
                size={24}
                color={colors.dark.textSecondary}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Back Button - Fixed Position */}
      <TouchableOpacity 
        onPress={() => Platform.OS === 'ios' ? router.back() : router.push('/')}
        style={{
          position: 'absolute',
          top: 75,
          left: 35,
          backgroundColor: colors.dark.button,
          padding: 10,
          borderRadius: 20,
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        <Ionicons 
          name="arrow-back"
          size={24} 
          color={colors.dark.text}
        />
      </TouchableOpacity>
    </View>
  );
}

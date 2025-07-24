import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://staging.mwe-tlmq.com/api';
const LOGIN_URL = `${BASE_URL}/public/login`;
const LOGOUT_URL = `${BASE_URL}/public/logout`;
const ACCOUNT_URL = `${BASE_URL}/mwe-user/accounts`;
const FAVORITES_URL = `${BASE_URL}/mwe-psychic/psychics-isUserFavoriteMissions`;
const PSYCHICS_URL = 'https://staging.mwe-tlmq.com/api/mwe-psychic/psychics';

const defaultHeaders = {
  'Mwe-Application-Tag-Id': '100',
  'Mwe-Application-Version': '1.0',
  'Mwe-User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Mwe-Ip-Address': '212.234.169.3',
  'Mwe-Language': 'en',
  'Content-Type': 'application/json'
};

export async function getToken() {
  const token = await AsyncStorage.getItem('authToken');
  console.log(
    'Retrieved token from AsyncStorage:',
    token ? 'Exists' : 'Does not exist'
  );
  return token;
}

export async function loginUser(email: string, password: string) {
  console.log('Attempting login with:', email);
  try {
    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        authenticationMethod: 'EMAIL',
        email,
        password
      })
    });

    const data = await res.json();
    console.log('Login response data:', data);

    if (!res.ok) {
      console.error('Login failed with status:', res.status, 'Data:', data);
      throw new Error(
        data?.message || 'Login failed: Invalid credentials or server error.'
      );
    }

    console.log('Login successful, received data:', data);
    return data;
  } catch (error) {
    console.error('Network or login request error:', error);
    throw error;
  }
}

export async function logoutUser() {
  const token = await getToken();
  if (!token) {
    console.warn('No token found for logout.');
    return;
  }
  try {
    const res = await fetch(LOGOUT_URL, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.error(
        'Logout failed with status:',
        res.status,
        'Data:',
        errorData
      );
      // Even if API logout fails, we'll clear local storage
    } else {
      console.log('Logout API call successful.');
    }
  } catch (error) {
    console.error('Network or logout request error:', error);
  }
}

export async function getUserProfile() {
  const token = await getToken();
  if (!token) {
    console.error('No authorization token found for getUserProfile.');
    throw new Error('Not authenticated.');
  }

  console.log(
    'Fetching user profile with token:',
    token.substring(0, 10) + '...'
  ); // Log partial token
  try {
    const res = await fetch(ACCOUNT_URL, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log('getUserProfile response status:', res.status);
    console.log('getUserProfile response data:', data);

    if (!res.ok) {
      console.error(
        'Failed to load profile with status:',
        res.status,
        'Data:',
        data
      );
      throw new Error(data?.message || 'Failed to load profile');
    }
    return data;
  } catch (error) {
    console.error('Network or getUserProfile request error:', error);
    throw error;
  }
}
export async function getFavoritePsychics() {
  const token = await getToken();
  if (!token) {
    console.error('No authorization token found for getFavoritePsychics.');
    throw new Error('Not authenticated.');
  }
  try {
    const res = await fetch(PSYCHICS_URL, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });
    const data = await res.json();
    const psychicsArray = Array.isArray(data.psychics) ? data.psychics : [];
    if (!res.ok) {
      console.error('Failed to load psychics:', data);
      throw new Error('Failed to load psychics');
    }
    // Return all favorites, online or offline
    return psychicsArray
      .filter((p: any) => p.isUserFavorite)
      .map((p: any) => ({
        id: p.id,
        avatar: p.pictureUrl,
        firstname: p.nickname,
        online: p.isConnected
      }));
  } catch (error) {
    console.error('Network or getFavoritePsychics request error:', error);
    throw error;
  }
}
// export async function getFavoritePsychics() {
//   const token = await getToken();
//   if (!token) {
//     console.error('No authorization token found for getFavoritePsychics.');
//     throw new Error('Not authenticated.');
//   }
//   try {
//     const res = await fetch(PSYCHICS_URL, {
//       method: 'GET',
//       headers: {
//         ...defaultHeaders,
//         Authorization: `Bearer ${token}`
//       }
//     });
//     const data = await res.json();
//     console.log('Psychics API response:', data);

//     // Use the correct array
//     const psychicsArray = Array.isArray(data.psychics) ? data.psychics : [];
//     if (!res.ok) {
//       console.error('Failed to load psychics:', data);
//       throw new Error('Failed to load psychics');
//     }
//     // Filter only favorites
//     return psychicsArray
//       .filter((p: any) => p.isUserFavorite)
//       .map((p: any) => ({
//         id: p.id,
//         avatar: p.pictureUrl,
//         firstname: p.nickname,
//         online: p.isConnected
//       }));
//   } catch (error) {
//     console.error('Network or getFavoritePsychics request error:', error);
//     throw error;
//   }
// }

export async function _getFavoritePsychics() {
  const token = await getToken();
  if (!token) {
    console.error('No authorization token found for getFavoritePsychics.');
    throw new Error('Not authenticated.');
  }
  try {
    const res = await fetch(FAVORITES_URL, {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`
      }
    });
    console.log('getFavoritePsychics response status:', res.status);
    if (!res.ok) throw new Error('Failed to load favorites');
    return await res.json();
  } catch (error) {
    console.error('Network or getFavoritePsychics request error:', error);
    throw error;
  }
}

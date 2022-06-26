import { View, Text, SafeAreaView, TextInput, ScrollView, Image, TouchableOpacity, Modal, Alert } from 'react-native'
import firebase from 'firebase/compat/app'
import { Button, Divider } from "react-native-elements";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import React, { useState, useEffect, createContext, useReducer, useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

const API_KEY = "19dedc791dc255982eaf84be8a93012a"

const prefix = "https://image.tmdb.org/t/p/w500/"

const firebaseConfig = {
    apiKey: "AIzaSyBeRQRtT32ZuHH9HSgGcCluQsle0syLuvE",
    authDomain: "tmdb-ec1d6.firebaseapp.com",
    projectId: "tmdb-ec1d6",
    storageBucket: "tmdb-ec1d6.appspot.com",
    messagingSenderId: "174621332414",
    appId: "1:174621332414:web:a3893ce15729b0fd585fef"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebaseApp.firestore()

const Stack = createNativeStackNavigator()

const LoginScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const SignUp = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
            if (!error) {
                navigation.navigate("Home")
            }

            const test = /\s/.test(name)

            if (test === true) {
                setError("Your Username shouldn't contain a blank space in it")
            } else {
                auth.updateCurrentUser({
                    displayName: name
                })
            }
        })
        .catch((err) => {
            console.log(err.message)

            setError(
                err.message === 'Firebase: The email address is badly formatted. (auth/invalid-email).' ? "That email is not valid sir"  : err.message
            )
        })
    }

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("./logo.png")} style={{ width: 300, resizeMode:'contain'}} />
            <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Email Address'
            placeholderTextColor="#444"
            style={{ borderColor: "#000", borderWidth: 1, width: '70%', height: 40, borderRadius: 5, paddingHorizontal: 10, marginVertical: 15 }}
         />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor="#444"
                style={{ borderColor: "#000", borderWidth: 1, width: '70%', height: 40, borderRadius: 5, paddingHorizontal: 10 }}
             />
             <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 50, paddingHorizontal: 10}}>
             <Text>{error}</Text>
             </View>
            <TouchableOpacity style={{ width: '55%', height: 43, backgroundColor: '#F6C800', borderWidth: 1, borderColor: "#000", alignItems: 'center', justifyContent: 'center', borderRadius: 5}} activeOpacity={0.5} onPress={() => SignUp()}>
            <Text style={{ fontSize: 15, fontWeight: '500'}}>Log In</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text>
                Dont have an account?
                {" "}
            </Text>
            <TouchableOpacity activeOpacity={0} onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#4082FF"}}>Sign Up</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const App = () => {
  return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen component={HomeScreen} name="Home" />
                <Stack.Screen component={LoginScreen} name="Login" />
                <Stack.Screen component={MovieScreen} name="Movie" />
                <Stack.Screen component={ActorScreen} name="Actor" />
                <Stack.Screen component={SignUpScreen} name="SignUp" />
            </Stack.Navigator>
        </NavigationContainer>
  )
}

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const SignUp = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
            navigation.navigate("Home")

            const test = /\s/.test(name)

            if (test === true) {
                setError("Your Username shouldn't contain a blank space in it")
            } else {
                auth.updateCurrentUser({
                    displayName: name
                })
            }
        })
        .catch((err) => {
            console.log(err.message)

            setError(
                err.message === 'Firebase: The email address is badly formatted. (auth/invalid-email).' ? "That email is not valid sir"  : err.message
            )
        })
    }

    return (
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require("./logo.png")} style={{ width: 300, resizeMode:'contain'}} />
            <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Email Address'
            placeholderTextColor="#444"
            style={{ borderColor: "#000", borderWidth: 1, width: '70%', height: 40, borderRadius: 5, paddingHorizontal: 10, marginVertical: 15 }}
         />
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder='Create a password'
                placeholderTextColor="#444"
                style={{ borderColor: "#000", borderWidth: 1, width: '70%', height: 40, borderRadius: 5, paddingHorizontal: 10 }}
             />
             <TextInput
             value={name}
             onChangeText={(text) => setName(text)}
             placeholder='What should we call you? (optional)'
             placeholderTextColor="#444"
             style={{ borderColor: "#000", borderWidth: 1, width: '70%', height: 40, borderRadius: 5, paddingHorizontal: 10, marginTop: 20 }}
          />
             <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 50}}>
             <Text>{error}</Text>
             </View>
            <TouchableOpacity style={{ width: '55%', height: 43, backgroundColor: '#F6C800', borderWidth: 1, borderColor: "#000", alignItems: 'center', justifyContent: 'center', borderRadius: 5}} activeOpacity={0.5} onPress={() => SignUp()}>
            <Text style={{ fontSize: 15, fontWeight: '500'}}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text>
                Already have a account?
                {" "}
            </Text>
            <TouchableOpacity activeOpacity={0} onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#4082FF"}}>Login</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const HomeScreen = ({ route }) => {
    const navigation = useNavigation()
    const [input, setInput] = useState("")
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)

const getMovies = () => {
    fetch(
        input ?
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${input}`
        :
        `https://api.themoviedb.org/3/movie/popular?api_key=19dedc791dc255982eaf84be8a93012a&language=en-US&page=${page}`
    )
    .then(res => res.json())
    .then(function (json) {
        setMovies(json.results)
    })
}

useEffect(() => {
        getMovies()
}, [input, page])

    return (
    <View>
        <View style={{ width: '100%', height: 120, backgroundColor: "#fff", alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
            <Image 
            source={require("./logo.png")}
            style={{ width: 70, resizeMode: 'contain'}}
            />
            <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ width: '55%', height: 40, paddingHorizontal: 10, backgroundColor: "#fff", borderWidth: 1, borderColor: "#000", borderRadius: 10}}
            placeholder="Search A Movie"
            />
            <Image 
            source={{
                uri: "https://pbs.twimg.com/profile_images/1469138712609144832/kIBtKWJY_400x400.png"
            }}
            style={{ width: 50, height: 50, borderRadius: 10}}
            />
        </View>
        <ScrollView style={{ width: '100%', height: '100%' }}>
        {movies.map((movie) => (
        <View style={{ alignItems: 'center'}}>
        <Movie 
        image={movie.poster_path}
        title={movie.title}
        id={movie.id}
        overview={movie.overview}
        genres={movie.genre_ids}
        rate={movie.vote_average}
        realaseDate={movie.release_date}
        />
        </View>
        ))}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: '23%', backgroundColor: 'transparent', height: 50, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ height: '100%', width: '40%', backgroundColor: "#fff", borderRadius: 10, borderColor: "#000", borderWidth: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => setPage(page === 1 ? page - 0 : page - 1)}>
            <Text style={{ fontSize: 33}}>-</Text>
        </TouchableOpacity>
        <Text>{page}</Text>
        <TouchableOpacity onPress={() => setPage(page + 1)}>
            <Text style={{ fontSize: 33}}>+</Text>
        </TouchableOpacity>
        </View>
        </View>
        <View style={{ position: 'absolute', bottom: '11%', backgroundColor: '#fff'}}>
        <BottomTabs />
        </View>
    </View>
    )
}

const Movie = ({ image, title, id, realaseDate, overview, rate, genres}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={{ width: '90%', height: 550, marginTop: 20, backgroundColor: '#333', borderRadius: 30 }} activeOpacity={0.5} 
        onPress={() => navigation.navigate("Movie", {
            image: image,
            title: title,
            id: id,
            genres_ids: genres,
            rate: rate,
            overview: overview,
            realaseDate: realaseDate
        })}>
            <Image 
            source={{
                uri: `${prefix}${image}`
            }}
            style={{ width: '100%', height: '100%', borderRadius: 30}}
            />
        </TouchableOpacity>
    )
}

const MovieScreen = ({ route }) => {
    const { image, title, id, realaseDate, overview, rate, genres_ids } = route.params
    const [actors, setActors] = useState([])
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => console.log(id), [])

const getCast = () => {
    fetch(`http://api.themoviedb.org/3/movie/${id}/casts?api_key=19dedc791dc255982eaf84be8a93012a`)
    .then((res) => res.json())
    .then((json) => setActors(json.cast))
}

useEffect(() => {
    getCast()
})

    return (
        <View style={{ width: '100%', height: '100%' }}>
        <TouchableOpacity 
        onPress={() => setModalVisible(true)}
        activeOpacity={1}
        style={{
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 3 },
            shadowOpacity: 0.6,
            shadowRadius: 3,
            elevation: 5,
        }}>
        <Image 
        source={{
            uri: `${prefix}${image}`
        }}
        style={{ width: '100%', height: 300}}
        />
        </TouchableOpacity>
        <ScrollView style={{ padding: 10}}>
        <View style={{ width: '100%', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 25, fontWeight: '600', width: '100%', marginHorizontal: 10}}>{title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 10}}>
            {genres_ids.map((genre) => (
                <TouchableOpacity style={{ marginHorizontal: 10, backgroundColor: "red", width: 110, borderRadius: 5, height: 40, alignItems: 'center', justifyContent: 'center' }} activeOpacity={0.5} >
                    <Text
                    style={{ color: "white", fontWeight: '600', fontSize: 15}}
                    >
                    {
                        genre &&
                        genre === 28 ? "Action" : genre &&
                        genre === 12 ? "Adventure" : genre &&
                        genre === 16 ?  "Animation" : genre &&
                        genre === 35 ? "Comedy" : genre &&
                        genre === 80 ? "Crime" : genre &&
                        genre === 99 ? "Documentary" : genre &&
                        genre === 18 ? "Drama" : genre &&
                        genre === 10751 ? "Family" : genre &&
                        genre === 14 ? "Fantasy" : genre &&
                        genre === 36 ? "History" : genre &&
                        genre === 27 ? "Horror" : genre &&
                        genre === 10402 ? "Muisc" : genre &&
                        genre === 9648 ? "Mystery" : genre &&
                        genre === 10749 ? "Romance" : genre &&
                        genre === 878 ? "Science Fiction" : genre &&
                        genre === 10770 ? "TV Movie" : genre &&
                        genre === 53 ? 'Thriller' : genre &&
                        genre === 10752 ? "War" : genre &&
                        genre === 37 ? "Western" : genre 
                    }</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
            <View style={{ width: '100%', alignItems: 'center'}}>
            <Text style={{ marginTop: 10, width: '95%'}}>
            {overview}
            </Text>
            <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 30, marginTop: 20, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 30, fontWeight: '600'}}>Actors</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign 
            name='staro'
            size={20}
            style={{ marginRight: 10}}
            />
                <Text>{rate} / 10</Text>
            </View>
            </View>
            </View>
            <Divider 
                width={1}
            />
            {actors.map((actor) => (
            <Actor 
            name={actor.name}
            character={actor.character}
            profile={actor.profile_path}
            id={actor.id}
            />
            ))}
        </ScrollView>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center'}} activeOpacity={1} onPress={() => setModalVisible(false)} >
            <View style={{ width: '90%', height: '70%', backgroundColor: "white", borderRadius: 20}}>
            <Image 
            source={{
                uri: prefix + image
            }}
            style={{ width: '100%', height: '100%', borderRadius: 20}}
            />
            </View>
        </TouchableOpacity>
        </Modal>
            <BottomTabs />
        </View>
    )
}

const Actor = (props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity 
        style={{ width: '100%', height: 100, borderBottomColor: "#000", borderBottomWidth: 2, alignItems: 'center', flexDirection: 'row'}} 
        activeOpacity={0.5} 
        onPress={() => navigation.navigate("Actor", {
            profile: props.profile,
            id: props.id,
            name: props.name,
            character: props.character
        })}
        >
            <Image 
            source={{
                uri: prefix + props.profile
            }}
            style={{
                height: 80,
                width: 80
            }}
            />
            <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 17, fontWeight: '500' }}>{props.name} as</Text>
            <Text style={{ marginTop: 7}}>{props.character}</Text>
            </View>
        </TouchableOpacity>
    )
}

const ActorScreen = ({ route }) => {
    const [actors, setActors] = useState([])
    const [info, setInfo] = useState(false)
    const navigation = useNavigation()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${route.params.id}?api_key=19dedc791dc255982eaf84be8a93012a&append_to_response=combined_credits`)
        .then((res) => res.json())
        .then((json) => {
            setActors(json)
            setMovies(json.combined_credits.cast)
        })

        console.log(route.params.id)
    }, [])

    console.log(route.params.id)

    return (
        <View>
        <ScrollView style={{ height: '90%'}}>
        <Image 
        source={{
            uri: prefix + actors.profile_path
        }}
        style={{ width: '100%', height: 320}}
        />
        <View style={{ height: '100%', width: '100%', padding: 10}}>
        <View style={{ flexDirection: 'row', marginBottom: 30, alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{ fontWeight: '600', fontSize: 35, width: '85%'}}>{actors.name}</Text>
        <Text style={{ fontWeight: '600', fontSize: 13, marginRight: 10}}>{actors.gender === 2 ? "Male" : "Female"}</Text>
        </View>
        <Text style={{ height: 60, marginHorizontal: 10}}>{actors.biography}</Text>
        <Text style={{ fontSize: 30, fontWeight: '600', marginBottom: 20}}>Known For</Text>
        <Divider horizontal width={1} />
        <View style={{ height: '100%', width: '100%', alignItems: 'center'}}>
        {movies.map((movie) => (
            <TouchableOpacity style={{ width: '90%', height: 600, borderRadius: 5, borderColor: "#000", borderWidth: 1, margin: 10}}
            onPress={() => navigation.navigate("Movie", {
                image: movie.poster_path,
                title: movie.original_title,
                id: movie.id,
                rate: movie.vote_average,
                overview: movie.overview,
                realaseDate: movie.release_date
            })}
            >
                <Image source={{ uri: prefix + movie.poster_path }} style={{ width: '100%', height: '100%'}} />
            </TouchableOpacity>
        ))}
        </View>
        </View>
        </ScrollView>
        <BottomTabs />
        </View>
    )
}

function BottomTabs() {
    const navigation = useNavigation()

    return (
      <View
        style={{
          flexDirection: "row",
          height:100,
          alignItems: 'flex-start',
          paddingTop: 5,
          borderTopColor: "#000",
          borderTopWidth: 1,
          width: '100%',
          justifyContent: "space-evenly",
        }}
      >
        <Icon icon="home" text="Home" onPress={() => navigation.navigate("Home")} />
        <Icon icon="user" text="Account" />
      </View>
    );
  }
  
  const Icon = (props) => (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <FontAwesome5
          name={props.icon}
          size={25}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
        />
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );

export default App
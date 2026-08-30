import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const API_URL = 'http://192.168.1.21:3000/filmes';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const buscarFilmes = async () => {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(API_URL);
      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os filmes.');
      }

      const dados = await resposta.json();
      setFilmes(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarFilmes();
  }, []);

  const renderFilme = ({ item }) => (
    <View style={styles.filme}>
      <View style={styles.filmeCabecalho}>
        <Text style={styles.tituloFilme}>{item.titulo}</Text>
        <View style={styles.nota}>
          <Text style={styles.notaTexto}>{item.nota}</Text>
        </View>
      </View>
      <Text style={styles.detalhes}>
        {item.genero} <Text style={styles.separador}>•</Text> {item.ano}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Catálogo de Filmes</Text>
        <Text style={styles.subtitulo}>Uma seleção para assistir hoje</Text>
        <Pressable
          accessibilityRole="button"
          disabled={carregando}
          onPress={buscarFilmes}
          style={({ pressed }) => [styles.botao, pressed && styles.botaoPressionado]}
        >
          <Text style={styles.botaoTexto}>
            {carregando ? 'Atualizando...' : 'Atualizar catálogo'}
          </Text>
        </Pressable>

        {carregando ? (
          <View style={styles.estado}>
            <ActivityIndicator color="#e9b44c" size="large" />
            <Text style={styles.estadoTexto}>Carregando filmes...</Text>
          </View>
        ) : erro ? (
          <View style={styles.estado}>
            <Text style={styles.erro}>{erro}</Text>
          </View>
        ) : (
          <FlatList
            data={filmes}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderFilme}
            contentContainerStyle={styles.lista}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08050d',
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  rotulo: {
    color: '#b86cff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  titulo: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 10,
  },
  subtitulo: {
    color: '#b9afc4',
    fontSize: 16,
    marginTop: 8,
  },
  botao: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#8b3dff',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  botaoPressionado: {
    backgroundColor: '#6e21d9',
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  lista: {
    paddingTop: 28,
    paddingBottom: 24,
  },
  filme: {
    backgroundColor: '#17111f',
    borderLeftColor: '#8b3dff',
    borderLeftWidth: 5,
    borderRadius: 4,
    marginBottom: 14,
    padding: 18,
  },
  filmeCabecalho: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tituloFilme: {
    color: '#ffffff',
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    paddingRight: 12,
  },
  nota: {
    alignItems: 'center',
    backgroundColor: '#8b3dff',
    borderRadius: 4,
    minWidth: 48,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  notaTexto: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
  },
  detalhes: {
    color: '#cbbddd',
    fontSize: 15,
    marginTop: 12,
  },
  separador: {
    color: '#b86cff',
    fontWeight: '800',
  },
  estado: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 80,
  },
  estadoTexto: {
    color: '#b9afc4',
    fontSize: 16,
    marginTop: 14,
  },
  erro: {
    color: '#ffaaa8',
    fontSize: 16,
    textAlign: 'center',
  },
});

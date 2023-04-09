import React, { useEffect, useReducer, useState } from 'react'
import { Container, InputField, PokemonContainer, Title } from './styles';
import { PokemonComponent } from '../../Components/PokemonComponent';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'increment':
      return {
        number: state.number < 1008 ? state.number + 1 : 1008
      }
    case 'decrement':
      return {
        number: state.number > 1 ? state.number - 1 : 1
      }
    case 'changeValue':
      return {
        number: action.value > 0 && action.value < 1008 ? action.value : state.number
      }
    default:
      return {
        number: state.number
      }
  }
}

type PokemonParams = {
  id: string
}

const PokemonPage = () => {
  const [pokemonResponse, setPokemonResponse] = useState<any>()
  const { id } = useParams<PokemonParams>()
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, { number: id ? +id : 1 })

  const handleGetPokemon = async (id: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setPokemonResponse(response.data)
  }

  useEffect(() => {
    handleGetPokemon(id ?? '1')
  }, [id])

  useEffect(() => {
    if (state.number !== id) {
      navigate(`/${state.number}`, { replace: true })
    }
  }, [state])

  return (
    <Container>
      <Title>Pokemon</Title>
      <PokemonContainer>
        <InputField>
          <button onClick={() => dispatch({ type: 'decrement' })}>Anterior</button>
          <input value={state?.number} onChange={(e) => dispatch({ type: 'changeValue', value: +e.currentTarget.value })} />
          <button onClick={() => dispatch({ type: 'increment' })}>Próximo</button>
        </InputField>
        {pokemonResponse ? (
          <PokemonComponent pokemonResponse={pokemonResponse} />
        ) : (
          <p>Carregando...</p>
        )}
      </PokemonContainer>
    </Container>
  )
}

export default PokemonPage

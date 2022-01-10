import React from "react";
import { drizzleConnect } from "@drizzle/react-plugin";
import Grid from "@material-ui/core/Grid";
import PetCard from "components/petCard";
import PropTypes from "prop-types";

const data = [
  {
    id: 0,
    name: "Coty",
    picture: "images/Cockatoos.JPG",
    age: 1,
    breed: "Cockatoos",
    location: "Amazon, Brazil"
  },
  {
    id: 1,
    name: "Gina",
    picture: "images/Cockatiel.JPG",
    age: 3,
    breed: "Cockatiel",
    location: "Tooleville, West Virginia"
  },
  {
    id: 2,
    name: "Collins",
    picture: "images/Conure-Parrot.JPG",
    age: 2,
    breed: "Conure Parrot",
    location: "Lahore, Pakistan"
  },
  {
    id: 3,
    name: "Nini",
    picture: "images/Parrotlet.JPG",
    age: 1,
    breed: "Parrotlet",
    location: "Camas, Pennsylvania"
  },
  {
    id: 4,
    name: "Jeanie",
    picture: "images/Senegal-Parrot.JPG",
    age: 2,
    breed: "Senegal Parrot",
    location: "Sialkot, Pakistan"
  },
  {
    id: 5,
    name: "Ladia",
    picture: "images/Eclectus-Parrots.JPG",
    age: 2,
    breed: "Eclectus Parrots",
    location: "Bangkok, Thailand"
  },
  {
    id: 6,
    name: "Tish",
    picture: "images/Macaws.JPG",
    age: 3,
    breed: "Macaws",
    location: "Soudan, Louisiana"
  },
  {
    id: 7,
    name: "Lema",
    picture: "images/Amazon-Parrots.JPG",
    age: 4,
    breed: "Amazon Parrots",
    location: "Beijing, China"
  },
  {
    id: 8,
    name: "Chole",
    picture: "images/Lovebirds.JPG",
    age: 1,
    breed: "Lovebirds",
    location: "Paris, France"
  },
  {
    id: 9,
    name: "Goldi",
    picture: "images/Goldfish.jpg",
    age: 0.6,
    breed: "Goldfish",
    location: "Islamabad, Pakistan"
  },
  {
    id: 10,
    name: "Nor",
    picture: "images/Beacon-Fish.JPG",
    age: 0.9,
    breed: "Beacon-Fish.JPG",
    location: "Istanbul, Turkey"
  },
  {
    id: 11,
    name: "Mia",
    picture: "images/Serpae-Tetra.JPG",
    age: 0.3,
    breed: "Serpae Tetra",
    location: "Windsor, Montana"
  },
  {
    id: 12,
    name: "Vens",
    picture: "images/Harlequin-Rasbora.JPG",
    age: 0.5,
    breed: "Harlequin Rasbora",
    location: "Tehran, Iran"
  },
  {
    id: 13,
    name: "Tish",
    picture: "images/Neon-Tetra.JPG",
    age: 0.4,
    breed: "Neon Tetra",
    location: "Dubai, UAE"
  },
  {
    id: 14,
    name: "Ethel",
    picture: "images/Guppies.JPG",
    age: 0.7,
    breed: "Guppies",
    location: "Bombay, India"
  },
  {
    id: 15,
    name: "Terry",
    picture: "images/Harlequin-Rasbora.JPG",
    age: 0.8,
    breed: "Harlequin Rasbora",
    location: "Dawn, Wisconsin"
  }
];

const Pets = (
  { accounts, contracts: { Adoption } },
  { drizzle: { contracts } }
) => {
  // Get all adopters
  const dataKey = contracts.Adoption.methods.getAdopters.cacheCall();

  // Contract is not yet intialized.
  if (!Adoption.initialized) {
    return <span>Initializing...</span>;
  }

  // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
  if (!(dataKey in Adoption.getAdopters)) {
    return <span>Fetching...</span>;
  }

  const adopters = Adoption.getAdopters[dataKey].value;

  const adopt = e => {
    // Retrieve the pet's id
    const id = e.currentTarget.value;

    // Declare this transaction to be observed. We'll receive the stackId for reference.
    const stackId = contracts.Adoption.methods.adopt.cacheSend(id, {
      from: accounts[0]
    });
    console.log(stackId);

    // .. track the transaction status ..
  };

  const renderPets = () => {
    return data.map(pet => (
      <Grid item xs={12} sm={3} key={pet.id}>
        <PetCard
          {...pet}
          adopted={
            adopters[pet.id] !== "0x0000000000000000000000000000000000000000"
          }
          onClick={adopt}
        />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={3}>
      {renderPets()}
    </Grid>
  );
};

Pets.propTypes = {
  contracts: PropTypes.object.isRequired
};

Pets.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts
  };
};

export default drizzleConnect(Pets, mapStateToProps);

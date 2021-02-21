import React,{Component} from "react";
import Property from "./Property/Property";
import Spinner from "../../Components/Spinner/Spinner"

class properties extends Component{
    state={
        flag:this.props.flag,
        pageLoaded:false,
        city:this.props.city,
        State:this.props.State,
        bathrooms:this.props.bathrooms,
        address:this.props.address,
        bedrooms:this.props.bedrooms,
        propertyType:this.props.propertyType,
        squareFootage:this.props.footage,
        compCount:this.props.compCount,
        listings:[]
    }

    componentDidMount=()=>{
        if(!this.state.pageLoad){
            if(this.state.flag===0)
            {

                const fetchData = async () => {
                    const res = await fetch(`https://realty-mole-property-api.p.rapidapi.com/rentalPrice?compCount=${this.state.compCount}&squareFootage=${this.state.squareFootage}&bathrooms=${this.state.bathrooms}&address=${this.state.address}&bedrooms=${this.state.bedrooms}&propertyType=${this.state.propertyType}`, {
                      "method": "GET",
                      "headers": {
                        "x-rapidapi-key": "eca084dc7emshabfc11644902855p117df7jsn30163e604465"
                      }
                    });
                    const json = await res.json();
                    console.log(json)
                    this.setState({listings:json.listings})
                    this.setState({pageLoaded:true})
                  }
                  fetchData();

        }else{
            const fetchData = async () => {
                const res = await fetch(`https://realty-mole-property-api.p.rapidapi.com/saleListings?city=${this.state.city}&state=${this.state.State}&limit=10`, {
                  "method": "GET",
                  "headers": {
                    "x-rapidapi-key": "eca084dc7emshabfc11644902855p117df7jsn30163e604465"
                  }
                });
                const json = await res.json();
                console.log(json)
                this.setState({listings:json})
                this.setState({pageLoaded:true})
              }
              fetchData();
        }
    }
    }

    render(){
        console.log(this.state.listings)
        let address;
        let zipcode;
        let property;
        console.log(this.state.pageLoaded)
        if(this.state.pageLoaded){
         property =  this.state.listings.map((p,index)=>{
            if(this.state.flag===0){
              address=p.address;
              zipcode=p.zipcode;
            }else{
              address=p.rawAddress;
              zipcode=p.zipCode;
            }
            return <Property 
            bathrooms={p.bathrooms} 
            bedrooms={p.bedrooms} 
            price={p.price} 
            address={address}
            footage={p.squareFootage}
            county={p.county}
            type={p.propertyType}
            city={p.city}
            state={p.state}
            zipcode={zipcode}
            latitude={p.latitude}
            longitude={p.longitude}
            />
          })
        }else{
          property=<Spinner/>
        }


        return(
            <div>
                {property}
            </div>
        )
    }
}


export default properties

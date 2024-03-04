
"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CommonKarnaContractSetup } from '@/helpers/commonSetup/CommonActionSetup';
import { executeCampaign } from '../server/Actions';
import { GetTransactionProvider } from "@/helpers/wallet/GetTransactionProvider";

// context type
interface DaoContextType {
    approveCampiagn:(id:number)=>void;
    addMembers:(address:string)=>void;
}

// Creating the context with an initial value
const DaoContext = createContext<DaoContextType | undefined>(undefined);

// Create a context provider component
interface DaoContextProviderProps {
  children: React.ReactNode;
}

// provider for the user context
export const DaoContextProvider: React.FC<DaoContextProviderProps> = ({ children }) => {
    const signer=GetTransactionProvider();
    // to approve campaign by the dao members
    const approveCampiagn=async(id:number)=>{
      try{
        console.log("aproving proposal",id);
        const karna_contract=await CommonKarnaContractSetup(signer);
        console.log("contract from the setup",karna_contract);
        const tx=await karna_contract?.vote(id);
        const respose=await tx.wait();
        const proposal=await karna_contract?.proposals(id);
        console.log("the resposne is",respose.events[1].args[1]);
        console.log("the proposal details",proposal);
        if(proposal[3])
        {
          console.log("the resposne is",respose);
          const address=respose.events[1].args[1];
          await executeCampaign(id,address);
        }
      }
      catch(e)
      {
        console.log("the error message is",e);
      }
    }

    // to add members to the dao
    const addMembers=async(address:string)=>{
      try{
        console.log("add member",address);
        const karna_contract=await CommonKarnaContractSetup(signer);
        console.log("contract from the setup",karna_contract);
        const respose=await karna_contract?.addMember(address);
      }
      catch(e)
      {
        console.log("the error message is",e);
      }
    }
  // add all the function here
  return <DaoContext.Provider value={{approveCampiagn, addMembers}}>{children}</DaoContext.Provider>;
};

// custom hook for accessing the user context 
export const useDaoContext = () => {
  const context = useContext(DaoContext);
  if (!context) {
    throw new Error('useDaoContext must be used within a DaoContextProvider');
  }
  return context;
};

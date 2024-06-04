"use client"
import GlobalApi from '../../../_utils/GlobalApi';
import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "../../../../components/ui/command"
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
function CategoryList() {
    const [categoryList,setCategoryList]=useState([]);
    const params=usePathname();
    const category=params.split('/')[2];
    useEffect(()=>{
    getCategoryList();
        
  },[])

  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    })
  }
  return (
    <div className='h-screen mt-5 flex flex-col'>
        <Command >
  <CommandInput placeholder="Type a command or search..." />
  <CommandList className="overflow-visible">
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions" >
        {categoryList&&categoryList.map((item,index)=>(
          <Link href={'/search/'+item?.attributes?.Name}
          className={`p-2 flex gap-2
          text-[14px]
          text-blue-600
          items-center
          rounded-md cursor-pointer w-full
          ${category==item.attributes.Name&&'bg-blue-100'}
          `}>
            <CommandItem key={index}>
                
                    <Image src={item.attributes?.Icon?.data.attributes?.url}
                    alt='icon'
                    width={25}
                    height={25}/>
                    <label>{item.attributes.Name}</label>         
            </CommandItem>
            </Link>
        ))}
      
     
    </CommandGroup>
   
  </CommandList>
</Command>
    </div>
  )
}

export default CategoryList

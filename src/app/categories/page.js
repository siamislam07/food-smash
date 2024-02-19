'use client'
import UserTabs from "@/components/layout/UserTabs";
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile"

const Page = () => {
    
    const {loading:profileLoading, data:profileData}= useProfile()

    if (profileLoading) {
        return 'Loading Info'
    }
    if(!profileData.admin){
        return "Not An Admin "
    }
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            categories
        </section>
    );
};

export default Page;
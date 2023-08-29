"use client"

import { useEffect } from "react"
import axios from "axios"
import { setCookie } from "@/lib/actions"

export default function Auth() {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {

      try {
        const res = await axios.get('/api/isauth', { signal });

        if (res.status === 200) {
          setCookie(true);
        }
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error:", error.message);
          if (error.response.status === 401) {
            setCookie(false);
          }
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup function to cancel the request if the component unmounts
      controller.abort();
    };
  }, []);


  return (<></>)
}
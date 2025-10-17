'use client'

import React, {useEffect} from "react";
import {CredentialProps} from "@/app/components/CredentialsProp";
import {fetch_results, get_total} from "@/app/api/api";
import {v4 as uuidv4} from 'uuid';
import LoadingSpinner from "@/app/components/LoadingSpinner";


const Table: React.FC<CredentialProps> = ({
                                              username,
                                              password,
                                          }) => {

    useEffect(() => {
        const call = async () => {
            try {
                const api1Result = await fetch_data();
                console.log(api1Result);
                // You may want to do setState here as well
            } catch (error) {
                // do something when you encounter errors
            }
        };

        call().then(r => {
            console.log("Setup")
        })
    }, []);

    const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

    const page_size = 20;

    const [page, setPage] = React.useState(0);
    const [data, setData] = React.useState<[[string]]>();
    const [totalRows, setTotalRows] = React.useState<number>(0);

    const [userId, setUserId] = React.useState<number | undefined>(undefined);
    const [showUserIdError, setShowUserIdError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const [loadingPagination, setLoadingPagination] = React.useState(-1);

    // used to show less paged results
    const [pageOffset, setPageOffset] = React.useState(0);
    const maxPageButtons = 5;

    // make this use rtk query probably
    const fetch_data = async (skipTotal: boolean = false, page_override?: number) => {
        setIsLoading(true);
        const data = await fetch_results(username, password, page_override ?? page, page_size, userId);
        if (!skipTotal) {
            const total = await get_total(username, password, userId);
            setTotalRows(total);
        }

        setData(data);
        setIsLoading(false);
    };

    const arrayRange = (start: number, stop: number, step: number) =>
        Array.from(
            {length: (stop - start) / step + 1},
            (value, index) => start + index * step
        );

    const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === undefined || e.target.value === '') {
            setShowUserIdError(false);
            return;
        }

        const parsedUserId = parseInt(e.target.value);
        if (Number.isNaN(parsedUserId)) {
            setShowUserIdError(true);
            return;
        }

        setShowUserIdError(false);
        setUserId(parsedUserId);
    };

    const set_page_number = async (page: number) => {
        setLoadingPagination(page);

        // re-trigger a new data fetch
        await fetch_data(true, page);

        // modify the page after the previous call
        setPage(page);

        // wait a bit before re-setting this
        await delay(300);

        // undo the loading of the specific column
        setLoadingPagination(-1);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {isLoading && (
                <LoadingSpinner/>
            )}
            {!isLoading && (
                <div>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Enter userId to filter" required
                           onChange={handleUserIdInput}/><input/>
                    {showUserIdError && (
                        <div className="text-center">
                            <p className="bg-red-500">Only numbers are allowed for userId.</p>
                        </div>
                    )}
                    <button
                        onClick={async () => {
                            await fetch_data()
                        }}
                        className="w-56 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >{data === undefined ? "Fetch Data" : "Re-Fretch Data"}
                    </button>
                </div>
            )}

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Event Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Event Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Product Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Category Code
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Brand
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                        User Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                        User Session
                    </th>
                </tr>
                </thead>
                <tbody>
                {data !== undefined && data.map((item: [string], i: number) => {
                    return [
                        <tr key={`${item[i]}-${uuidv4()}`}>
                            {item.map((value: string) => {
                                return (
                                    <td key={`${item[i]}-${uuidv4()}`} className="px-6 py-4">
                                        {value}
                                    </td>);
                            })}
                        </tr>
                    ];
                })}
                </tbody>
            </table>
            {data !== undefined && totalRows !== undefined && (
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
                     aria-label="Table navigation">
                <span
                    className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span
                    className="font-semibold text-gray-900 dark:text-white">{page + 1}</span> of <span
                    className="font-semibold text-gray-900 dark:text-white">{Math.round(totalRows / page_size) === 0 ? 1 : Math.round(totalRows / page_size)} pages. Total rows: {totalRows}</span></span>
                    <div className="inline-flex">
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            {data !== undefined && (
                                arrayRange(0, Math.round(totalRows / page_size) > maxPageButtons - 1 ? maxPageButtons - 1 : Math.round(totalRows / page_size), 1).map((item, i) => {
                                    if (loadingPagination !== -1 && loadingPagination === i) {
                                        return (
                                            <li key={`${i}-${uuidv4()}`}
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                <LoadingSpinner/>
                                            </li>)
                                    } else {
                                        return (<li key={`${i}-${uuidv4()}`}
                                        >
                                            <button
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                onClick={async () => {
                                                    if (loadingPagination === -1 && i !== page) {
                                                        await set_page_number(i)
                                                    }
                                                }}>{i + 1}</button>
                                        </li>)
                                    }
                                })
                            )}
                        </ul>
                        <p>...</p>
                    </div>
                </nav>
            )}
        </div>


    );
};

export default Table;
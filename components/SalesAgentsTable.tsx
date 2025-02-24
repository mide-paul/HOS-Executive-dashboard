import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import avatar from "./../public/images/avatar.svg";
import action from "./../public/icons/action.svg";
import arrow_left from "./../public/icons/arrow_left.svg";
import arrow_right from "./../public/icons/arrow_right.svg";

interface Agent {
    id: number;
    name: string;
    email: string;
    date: string;
    status: "Active" | "Blocked";
    image: string;
}

const SalesAgentsTable: React.FC = () => {
    // const [agents, setAgents] = useState<Agent[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showActionModal, setShowActionModal] = useState<boolean>(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    const [agents, setAgents] = useState<Agent[]>(
        Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            name: `Agent ${i + 1}`,
            email: "olive@gmail.com",
            date: "23-01-2025",
            status: i % 2 === 0 ? "Active" : "Blocked",
            image: "https://via.placeholder.com/50",
        }))
    );

    const agentsPerPage = 10;
    const totalPages = Math.ceil(agents.length / agentsPerPage);

    // useEffect(() => {
    //     const fetchAgents = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch("http://localhost:3000/api/v1/sales-agents");
    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch agents");
    //             }
    //             const data = await response.json();
    //             setAgents(data);
    //         } catch (err: any) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchAgents();
    // }, []);

    const paginatedAgents = agents.slice(
        (currentPage - 1) * agentsPerPage,
        currentPage * agentsPerPage
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleBlockUnblockAgent = () => {
        if (selectedAgent) {
            setAgents((prevAgents) =>
                prevAgents.map((agent) =>
                    agent.id === selectedAgent.id
                        ? { ...agent, status: agent.status === "Active" ? "Blocked" : "Active" }
                        : agent
                )
            );
            setShowActionModal(false);
        }
    };

    const handleDeleteAgent = () => {
        if (selectedAgent) {
            setAgents((prevAgents) => prevAgents.filter(agent => agent.id !== selectedAgent.id));
            setShowActionModal(false);
        }
    };

    // if (loading) {
    //     return <p className="text-center">Loading...</p>;
    // }

    // if (error) {
    //     return <p className="text-center text-red-500">{error}</p>;
    // }

    // const API_BASE_URL = "https://api.hosoptima.com/api";

    // const updateAgentStatus = async (agentId: number, status: "Active" | "Blocked") => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/agents/${agentId}/status`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //             body: JSON.stringify({ status }),
    //         });

    //         if (!response.ok) throw new Error("Failed to update agent status");

    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error updating agent status:", error);
    //     }
    // };

    // const deleteAgent = async (agentId: number) => {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/agents/${agentId}`, {
    //             method: "DELETE",
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         });

    //         if (!response.ok) throw new Error("Failed to delete agent");

    //         return await response.json();
    //     } catch (error) {
    //         console.error("Error deleting agent:", error);
    //     }
    // };

    return (
        <div className="p-6">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="bg-gray-100 text-left text-xs">
                        <th className="p-2 font-medium">Sales agent name</th>
                        <th className="p-2 font-medium">Email</th>
                        <th className="p-2 font-medium">Date Joined</th>
                        <th className="p-2 font-medium">Status</th>
                        <th className="p-2 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedAgents.map((agent) => (
                        <tr key={agent.id} className="border-b hover:bg-gray-50">
                            <td className="p-2 flex gap-3 items-center text-xs">
                                <Image src={avatar} alt="source logo" className="w-6 h-6 rounded-full mr-0" />
                                {agent.name}
                            </td>
                            <td className="p-2 text-xs">{agent.email}</td>
                            <td className="p-2 text-xs">{agent.date}</td>
                            <td className={`p-2 font-medium text-xs ${agent.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                                <span className={`px-2 py-0.5 rounded-2xl text-xs ${agent.status === "Active" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                                    {agent.status}
                                </span>
                            </td>
                            <td className="p-2 text-xs">
                                <button
                                    onClick={() => {
                                        setSelectedAgent(agent);
                                        setShowActionModal(true);
                                    }}
                                    className="text-blue-500 hover:underline text-sm"
                                >
                                    <Image src={action} alt="" className="w-6 h-6 ml-6" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                    <Image
                        src={arrow_left}
                        alt=""
                        className="absolute w-4 h-4 ml-3 object-cover"
                    />
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 pl-8 rounded-md text-xs border border-blue-950 ${currentPage === 1
                            ? "bg-white text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950"
                            }`}
                    >
                        Previous
                    </button>
                </div>
                <span className="text-gray-700 text-xs">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center">
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 pr-8 rounded-md text-xs border border-blue-950 ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-white text-blue-950"
                            }`}
                    >
                        Next
                    </button>
                    <Image
                        src={arrow_right}
                        alt=""
                        className="absolute w-4 h-4 ml-12 object-cover"
                    />
                </div>
            </div>

            {showActionModal && selectedAgent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xs font-semibold mb-4">Agent Actions</h2>
                        <p className="mb-4 text-xs">What would you like to do with {selectedAgent.name}?</p>
                        <ul className="space-y-4">
                            <li><Link href="/agent-details"><button className="text-blue-500 text-xs hover:underline">View Agent Details</button></Link></li>
                            <li><button onClick={handleBlockUnblockAgent} className="text-blue-500 text-xs hover:underline">{selectedAgent.status === "Active" ? "Block" : "Unblock"} Agent</button></li>
                            <li><button onClick={handleDeleteAgent} className="text-red-500 text-xs hover:underline">Delete Agent</button></li>
                            {/* <button
                                onClick={async () => {
                                    if (selectedAgent) {
                                        await updateAgentStatus(selectedAgent.id, "Blocked");
                                        setShowActionModal(false)
                                    }
                                }}
                                className="text-blue-500 text-xs hover:underline"
                            >
                                Block Agent
                            </button>

                            <button
                                onClick={async () => {
                                    if (selectedAgent) {
                                        await deleteAgent(selectedAgent.id);
                                        setShowActionModal(false)
                                    }
                                }}
                                className="text-red-500 text-xs hover:underline"
                            >
                                Delete Agent
                            </button> */}
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setShowActionModal(false)} className="px-4 py-2 text-xs bg-gray-300 rounded-md">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesAgentsTable;
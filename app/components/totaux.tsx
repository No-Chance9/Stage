import { saveAs } from 'file-saver';

export default function Overview() {
    const data = [
        {
            title: "Total Customers",
            value: "21.978",
            percentage: 15,
        },
        {
            title: "Active Customers",
            value: "10.432",
            percentage: -43,
        },
        {
            title: "Total Profit",
            value: "$32.978,32",
            percentage: 59,
        },
        {
            title: "Total Expense",
            value: "$23.978,42",
            percentage: -13,
        },
    ];

    // const exportToCSV = () => {
    //     const csvRows = [
    //         ["Title", "Value", "Percentage"],
    //         ...data.map(item => [item.title, item.value, item.percentage])
    //     ];

    //     const csvContent = csvRows.map(e => e.join(",")).join("\n");
    //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    //     saveAs(blob, 'dashboard_data.csv');
    // };

    return (
        <div className="flex flex-col gap-4">
            <button 
                // onClick={exportToCSV} 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg self-start mb-4"
            >
                Download CSV
            </button>
            <div className="flex flex-row gap-2">
                {data.map((item, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 w-64">
                        <h2 className="text-xl font-bold mb-4"><img src="/images/decreasing.svg" alt="" /> {item.title}</h2>
                        <p className="text-3xl font-semibold">{item.value}</p>
                        <p className={`${item.percentage < 0 ? 'text-red-500' : 'text-green-500'} mt-2`}>
                            {item.percentage}% From the last month
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}














const Dashboard = () => {
  return (
    <div className="flex flex-1 p-1">
      <div className="text-white flex-1 p-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-2xl font-bold sm:text-xl md:text-2xl lg:text-5xl dark:text-white text-[#4c5c68]">Admin Dashboard</p>
          <div className="flex items-center">
            <button className="bg-gray-800 px-4 py-2 rounded-md mr-4">
              Type to search...
            </button>
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 md:grid-flow-col-3 sm:grid-flow-col-1">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">$3.456K</h3>
                <p className="text-gray-400">Total views</p>
              </div>
              <div className="text-green-500">0.43% ▲</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">$45.2K</h3>
                <p className="text-gray-400">Total Profit</p>
              </div>
              <div className="text-green-500">4.35% ▲</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">2.450</h3>
                <p className="text-gray-400">Total Product</p>
              </div>
              <div className="text-green-500">2.59% ▲</div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">3.456</h3>
                <p className="text-gray-400">Total Users</p>
              </div>
              <div className="text-green-500">0.98% ▲</div>
            </div>
          </div>
        </div>
        {/* New flex container for Profit and Visitors */}
        <div className="mt-8 flex gap-4">
          {/* Profit this week div - takes 1/3 of the space */}
          <div className="bg-gray-800 p-4 rounded-lg flex-[1]">
            <h3 className="text-xl font-bold mb-4">Profit this week</h3>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-gray-400">Day</span>
                <span className="text-white">This Week</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Week</span>
                <span className="text-white">This Week</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400">Month</span>
                <span className="text-white">This Week</span>
              </div>
            </div>
          </div>

          {/* Visitors Analytics div - takes 2/3 of the space */}
          <div className="bg-gray-800 p-4 rounded-lg flex-[2]">
            <h3 className="text-xl font-bold mb-4">Visitors Analytics</h3>
            <div className="flex justify-between">
              <div className="w-1/2">
                <canvas id="visitors-analytics"></canvas>
              </div>
              <div className="w-1/2">
                <canvas id="region-labels"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

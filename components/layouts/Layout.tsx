import Header from "../header/Header";
import CreatePostModal from "../modals/CreatePostModal";
import EditPostModal from "../modals/EditPostModal";
import EditProfileModal from "../modals/EditProfileModal";
import Sidebar from "../sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <EditPostModal />
      <CreatePostModal />
      <EditProfileModal />
      <div className="h-screen bg-neutral-950">
        <div className="md:w-5/6 mx-auto w-11/12">
          <Header />
          <div className="w-full h-full">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-4 lg:col-span-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

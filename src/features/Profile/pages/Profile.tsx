import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import ProfileButtons from "../components/ProfileButtons";
import ProfileConfigurations from "../components/ProfileConfigurations";
import ProfileImageSection from "../components/ProfileImageSection";
import ProfileInfoSection from "../components/ProfileInfoSection";
import { useEffect, useState } from "react";
import { useGetUserByUsername } from "../hooks/useProfile";
import { useCurrentUser } from "../../Auth/hooks/useCurrentUser";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState('about');
  const {user:authuser} = useCurrentUser()

  const { username } = useParams<{ username?: string }>();
  // const bottomRef = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();

  const { user, isLoading: isLoadingUsername } = useGetUserByUsername(username || "");



  // const user = userByUsername;
  // const isLoading = isLoadingUsername;
  // const authorId = user?.id || "";

  // // Infinite scrolling hooks
  // const {
  //   data: authorPostsData,
  //   isLoading: isLoadingPosts,
  //   error: postsError,
  //   fetchNextPage: fetchNextPosts,
  //   hasNextPage: hasNextPosts,
  //   isFetchingNextPage: isFetchingNextPosts,
  // } = useGetAuthorPosts(authorId);

  // const {
  //   data: authorArticlesData,
  //   isLoading: isLoadingArticles,
  //   error: articlesError,
  //   fetchNextPage: fetchNextArticles,
  //   hasNextPage: hasNextArticles,
  //   isFetchingNextPage: isFetchingNextArticles,
  // } = useGetAuthorArticles(authorId);

  const isAuthUser = username?.trim() === authuser?.username?.trim();


  useEffect(()=>{
    console.log('me',user)
  },[user])

  // Render content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'about':
        return (
          <div className="p-4 bg-neutral-800 rounded-lg mt-4">
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="text-neutral-300">
              This section contains information about the user, their bio, interests, 
              and other personal details they've chosen to share.
            </p>
          </div>
        );
      case 'posts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-800 rounded-lg">
                <p className="text-neutral-300">Your latest posts will appear here.</p>
              </div>
            </div>
          </div>
        );
      case 'articles':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Articles</h3>
            <p className="text-neutral-300">Your published articles will be displayed here.</p>
          </div>
        );
      case 'media':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Media</h3>
            <p className="text-neutral-300">Your photos and videos will appear in this section.</p>
          </div>
        );
      case 'reposts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Reposts</h3>
            <p className="text-neutral-300">Content you've reposted will be shown here.</p>
          </div>
        );
      case 'podcasts':
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Podcasts</h3>
            <p className="text-neutral-300">Your podcast episodes and series will be displayed here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Profile</div>
        </Topbar>
        <div className="max-w-3xl m-auto">
          {/* Banner and profile image section */}
          <ProfileImageSection user={user!} />
          
          {/* profile info and buttons */}
          <div className="w-full flex px-6 relative">
            <ProfileInfoSection user={user!}  />
            <ProfileButtons user={user!} />
          </div>
          
          {/* Tabs section */}
          <div className="w-full px-4 my-6">
            {/* Using the Tabs component like in Feed */}
            <Tabs
              tabs={[
                { id: 'about', title: 'About' },
                { id: 'posts', title: 'Posts' },
                { id: 'articles', title: 'Articles' },
                { id: 'media', title: 'Media' },
                { id: 'reposts', title: 'Reposts' },
                { id: 'podcasts', title: 'Podcasts' }
              ]}
              activeTab={activeTab}
              setActiveTab={(tabId) => setActiveTab(String(tabId))}
              borderBottom={true}
            />
            
            {/* Tab content */}
            {renderTabContent()}
          </div>
        </div>
      </MainContent>

      <RightBar>
        <ProfileConfigurations />
      </RightBar>
    </div>
  );
};

export default Profile;
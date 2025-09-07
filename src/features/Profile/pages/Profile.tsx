import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import ProfileButtons from "../components/ProfileButtons";
import ProfileConfigurations from "../components/ProfileConfigurations";
import ProfileImageSection from "../components/ProfileImageSection";
import ProfileInfoSection from "../components/ProfileInfoSection";
import { useGetUserByUsername } from "../hooks/useProfile";
import { useCurrentUser } from "../../Auth/hooks/useCurrentUser";
import ProfileSkeleton from "../components/ProfileSkeleton";
import ProfileRightBarLoader from "../components/ProfileRightBarLoader";
import AuthorSimilarProfiles from "../components/AuthorSimilarProfiles";
import { useRoute } from "../../../hooks/useRoute";

export const Profile:React.FC = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { user: authuser } = useCurrentUser();
  const {routeToUseProfile} = useRoute()

  const { username } = useParams<{ username?: string }>();
  const navigate = useNavigate();

  // Fetch user by username
  const { user, isLoading: isLoadingUsername } = useGetUserByUsername(username || "");

  // Variables for scrolling and navigation (comments preserved)
  // const bottomRef = useRef<HTMLDivElement>(null);
  // const navigate = useNavigate();

  // Variables for posts and articles fetching (commented out)
  // const user = userByUsername;
  // const isLoading = isLoadingUsername;
  // const authorId = user?.id || "";

  // // Infinite scrolling hooks commented out
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

  // Check if profile belongs to authenticated user
  const isAuthUser = username?.trim() === authuser?.username?.trim();

  useEffect(() => {
    console.log("Fetched user data:", user);
  }, [user]);

  // Function to render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="p-4 bg-neutral-800 rounded-lg mt-4 text-neutral-300">
          {  user?.about?  
            <p className="text-neutral-300">
             {user?.about}
            </p> : <div className="w-full flex flex-col items-center">
            { isAuthUser?  <button onClick={()=>routeToUseProfile(user?.username || '')} className="px-4  py-2 rounded-full bg-primary-400 text-white">Write More About You</button>: <div>{user?.name} has No About </div> }
            </div> }
          </div>
        );
      case "posts":
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
      case "articles":
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Articles</h3>
            <p className="text-neutral-300">Your published articles will be displayed here.</p>
          </div>
        );
      case "media":
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Media</h3>
            <p className="text-neutral-300">Your photos and videos will appear in this section.</p>
          </div>
        );
      case "reposts":
        return (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4">Reposts</h3>
            <p className="text-neutral-300">Content you've reposted will be shown here.</p>
          </div>
        );
      case "podcasts":
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

  // Show a loading message while user data is loading
  if (isLoadingUsername) {
    return (
 
       <ProfileSkeleton isLoading/>
     
    );
  }

  // Show a friendly message if no user is found
  if (!user) {
    return (

        <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Profile</div>
        </Topbar>
        <div className="max-w-3xl m-auto">
          <p className="mb-4 text-lg text-neutral-100">User not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-primary-400 rounded-full hover:bg-primary-600 transition-colors"
        >
          Go Back
        </button>
        </div>
      
      </MainContent>

      <RightBar>
         <ProfileRightBarLoader/>
        
        
     
      </RightBar>
    </div>
     
    );
  }

  // Main profile page rendering
  return (
    <div className="lg:grid grid-cols-[4fr_1.65fr]">
      <MainContent>
        <Topbar>
          <div className="px-2 text-neutral-100">Profile</div>
        </Topbar>
        <div className="max-w-3xl m-auto">
          {/* Banner and profile image section */}
          <ProfileImageSection user={user} />

          {/* Profile info and buttons */}
          <div className="w-full flex px-6 relative">
            <ProfileInfoSection user={user} />
            <ProfileButtons user={user} />
          </div>

          {/* Tabs section */}
          <div className="w-full px-4 my-6">
            {/* Using the Tabs component */}
            <Tabs
              tabs={[
                { id: "about", title: "About" },
                { id: "posts", title: "Posts" },
                { id: "articles", title: "Articles" },
                { id: "media", title: "Media" },
                { id: "reposts", title: "Reposts" },
                { id: "podcasts", title: "Podcasts" },
              ]}
              activeTab={activeTab}
              setActiveTab={(tabId) => setActiveTab(String(tabId))}
              borderBottom={true}
            />

            {/* Tab content below tabs */}
            {renderTabContent()}

          
          </div>
        </div>
      </MainContent>

      <RightBar>
       {isAuthUser ? <ProfileConfigurations /> : <AuthorSimilarProfiles/>}
      </RightBar>
    </div>
  );
};

export default Profile;

import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import { useState } from "react";
import AuthorSuggestionsList from "../../Profile/components/AuthorSuggestions";
import PostCard from "../../Blog/components/PostsArticleCards/PostCard";
import ArticleCard from "../../Blog/components/PostsArticleCards/ArticleCard";
import PostCardCommentary from "../../Blog/components/PostsArticleCards/PostCardCommentary";
import PostCardNoCommentary from "../../Blog/components/PostsArticleCards/PostCardNoCommentary";
import ArticleCardCommentary from "../../Blog/components/PostsArticleCards/ArticleCardCommentary";
import ArticleCardNoCommentary from "../../Blog/components/PostsArticleCards/ArticleCardNoCommentary";


export const Feed = () => {
  const [activeTab, setActiveTab] = useState('for_you');

  return (
    <div className="w-full lg:grid grid-cols-[4fr_1.65fr]">
      {/* Main Content */}
      <MainContent>
        <Topbar>
          <Tabs
            tabs={[
              { id: 'for_you', title: 'For You' },
              { id: 'following', title: 'Following' },
              { id: 'podcast', title: 'Podcast' },
            ]}
            activeTab={activeTab}
            setActiveTab={(tabId) => setActiveTab(String(tabId))}
           
          />
        </Topbar>
     <div className="w-full max-w-full flex flex-col gap-16 sm:max-w-3xl mx-auto px-4 sm:px-6 my-8">
        <ArticleCardCommentary/>
        <ArticleCardNoCommentary/>
        <PostCard/>
        <ArticleCard/>
        <PostCardNoCommentary/>
        <PostCard/>
        <PostCardCommentary/>
      </div>
      </MainContent>
    

      {/* Right Sidebar */}
      <RightBar>
        <AuthorSuggestionsList/>
      </RightBar>
      
    </div>
  );
};

export default Feed;

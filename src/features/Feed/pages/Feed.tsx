import { MainContent } from "../../../components/MainContent";
import { RightBar } from "../../../components/RightBar";
import Topbar from "../../../components/Topbar";
import Tabs from "../../../components/Tabs";
import { useEffect, useRef, useState } from "react";
import AuthorSuggestionsList from "../../Profile/components/AuthorSuggestions";
import PostCard from "../../Blog/components/PostsArticleCards/PostCard";
import ArticleCard from "../../Blog/components/PostsArticleCards/ArticleCard";
import PostCardCommentary from "../../Blog/components/PostsArticleCards/PostCardCommentary";
import PostCardNoCommentary from "../../Blog/components/PostsArticleCards/PostCardNoCommentary";
import ArticleCardCommentary from "../../Blog/components/PostsArticleCards/ArticleCardCommentary";
import ArticleCardNoCommentary from "../../Blog/components/PostsArticleCards/ArticleCardNoCommentary";
import { useGetAllArticles } from "../../Blog/hooks";
import type { Article } from "../../../models/datamodels";
import { LucideLoader } from "lucide-react";
import BlogSkeletonComponent from "../../Blog/components/PostCardComponents/BlogSkeleton";

export const Feed = () => {
  const [activeTab, setActiveTab] = useState("for_you");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch data
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllArticles();

  // Auto-fetch next page when scrolling to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // viewport
        rootMargin: "800px",
        threshold: 0.5,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Render
  return (
    <div className="w-full lg:grid grid-cols-[4fr_1.65fr]">
      {/* Main Content */}
      <MainContent>
        <Topbar>
          <Tabs
            tabs={[
              { id: "for_you", title: "For You" },
              { id: "following", title: "Following" },
              { id: "podcast", title: "Podcast" },
            ]}
            activeTab={activeTab}
            setActiveTab={(tabId) => setActiveTab(String(tabId))}
          />
        </Topbar>
        <div className="w-full max-w-full flex flex-col gap-16 sm:max-w-3xl mx-auto px-4 sm:px-6 my-8">
          {/* Loading state */}
          {isLoading && <>
          <BlogSkeletonComponent  />
          <BlogSkeletonComponent  />
          
          </> }

          {/* Error state */}
          {error && (
            <div className="px-1 sm:px-8 w-[98%] sm:w-[90%] text-neutral-50 text-center py-4">
              Something went wrong while fetching articles.
            </div>
          )}

          {/* Articles/Posts rendering */}
          {data?.pages.map((page, i) => (
            <div className="flex flex-col gap-12" key={i}>
              {page.articles.map((article: Article) => {
                const isArticle = article.isArticle;
                const hasRepost = !!article.repost;
                const hasCommentary = hasRepost && article.repost?.repost_comment;
                const isPost = !isArticle; // posts are not articles

                if (isArticle) {
                  if (hasRepost) {
                    if (hasCommentary) {
                      return (
                        <ArticleCardCommentary
                          key={article.article_id || article._id}
                          article={article}
                        />
                      );
                    } else {
                      return (
                        <ArticleCardNoCommentary
                          key={article.article_id || article._id}
                          article={article}
                        />
                      );
                    }
                  } else {
                    return (
                      <ArticleCard
                        key={article.article_id || article._id}
                        article={article}
                      />
                    );
                  }
                } else if (isPost) {
                  if (hasRepost) {
                    if (hasCommentary) {
                      return (
                        <PostCardCommentary
                          key={article.article_id || article._id}
                          article={article}
                        />
                      );
                    } else {
                      return (
                        <PostCardNoCommentary
                          key={article.article_id || article._id}
                          article={article}
                        />
                      );
                    }
                  } else {
                    return (
                      <PostCard
                        key={article.article_id || article._id}
                        article={article}
                      />
                    );
                  }
                }
                // fallback
                return null;
              })}
            </div>
          ))}

          {/* Loader when fetching next page */}
          {isFetchingNextPage && (
            <div className="px-1 sm:px-8 w-[98%] sm:w-[90%] transition-all duration-300 ease-linear flex flex-col-reverse mt-8">
              <LucideLoader className="animate-spin text-primary-400 self-center size-10 inline-block mx-4" />
            </div>
          )}

          {/* Sentinel div for infinite scroll */}
          <div ref={bottomRef} style={{ height: "100px" }} />
        </div>
      </MainContent>

      {/* Right Sidebar */}
      <RightBar>
        <AuthorSuggestionsList />
      </RightBar>
    </div>
  );
};

export default Feed;
